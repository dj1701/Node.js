const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [{
    _id: userOneId,
    emailAddress: 'dj@example.com',
    password: 'userOnePassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'ABC123').toString()
    }]
}, {
    _id: userTwoId,
    emailAddress: 'test@example.com',
    password: 'userTwoPassword'
}];

const todos = [{
    _id: new ObjectId,
    text: 'First test todo'
},{
    _id: new ObjectId,
    text: 'First second todo',
    completed: true,
    completedAt: 4444
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};