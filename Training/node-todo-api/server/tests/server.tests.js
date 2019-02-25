const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

let appServer;
const todos = [{
    _id: new ObjectId,
    text: 'First test todo'
},{
    _id: new ObjectId,
    text: 'First second todo'
}]

beforeEach((done) => {
    var port = 4001;
    appServer = app(port)
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
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