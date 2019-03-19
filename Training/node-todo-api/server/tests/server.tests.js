const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
const {ObjectId} = require('mongodb');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
let appServer;

beforeEach(populateUsers);
beforeEach(populateTodos);
beforeEach((done) => {
    appServer = app(4001);
    done();
});

afterEach((done) => {
    appServer.server.close();
    done();
});

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(appServer)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {

        request(appServer)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(appServer)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todo/:id', () => {
    it('should return todo doc', (done) => {
        request(appServer)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectId().toHexString()

        request(appServer)
            .get(`/todos/${id}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.status).toBe('todo not found')
            })
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(appServer)
            .get('/todos/123')
            .expect(404)
            .expect((res) => {
                expect(res.body.status).toBe('Invalid Id');
            })
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(appServer)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch(err => done(err));
            });
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectId().toHexString()

        request(appServer)
            .delete(`/todos/${id}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.status).toBe('todo not found')
            })
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(appServer)
            .delete('/todos/123')
            .expect(404)
            .expect((res) => {
                expect(res.body.status).toBe('Invalid Id');
            })
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var todo = {text: 'First test todo has changed', completed: true};

        request(appServer)
            .patch(`/todos/${hexId}`)
            .send(todo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todo.text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var todo = {text: 'First second todo has changed', completed: false};

        request(appServer)
            .patch(`/todos/${hexId}`)
            .send(todo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todo.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
});

describe('GET users/me', () => {
    it('should return user if authenticated', (done) => {
        request(appServer)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.emailAddress).toBe(users[0].emailAddress);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(appServer)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token + 1)
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({})
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var emailAddress = 'example@example.com';
        var password = '123!ABC';

        request(appServer)
            .post('/users')
            .send({emailAddress, password})
            .expect(200)
            .expect((res) => {
                expect(res.header['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.emailAddress).toBe(emailAddress);
            })
            .end((err) => {
                if(err){
                    return done(err);
                }

                User.findOne({emailAddress}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should return validation errors if invalid requets', (done) => {
        var emailAddress = 'invalidEmail';
        var password = '123!A';

        request(appServer)
            .post('/users')
            .send({emailAddress, password})
            .expect(400)
            .expect((res) => {
                expect(res.body.errors).toExist();
            })
            .end(done);
    });

    it('should not create user if email in user', (done) => {
        var emailAddress = 'test@example.com';
        var password = '123!ABC';

        request(appServer)
            .post('/users')
            .send({emailAddress, password})
            .expect(400)
            .end(done);
    }); 
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(appServer)
            .post('/users/login')
            .send({
                emailAddress: users[1].emailAddress,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[0]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should reject invalid login', (done) => {
        request(appServer)
            .post('/users/login')
            .send({
                emailAddress: 'invalidEmailAddress',
                password: users[1].password
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
        request(appServer)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((err) => done(err));
            });
    });
});