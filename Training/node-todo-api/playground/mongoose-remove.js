const {ObjectId} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

Todo.deleteMany({}).then((result) => {
    console.log(result);
});

Todo.findByIdAndRemove('5c70049702bd08189228e6e5').then((todo) => {
    console.log(todo);
});