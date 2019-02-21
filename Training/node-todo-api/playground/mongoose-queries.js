const {ObjectId} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

var id = '5c6e97ae35564471ab6977cc';

if(!ObjectId.isValid(id)){
    console.log('Id not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: '5c6e8618807fd7180ef1337f'
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch((err) => console.log(err));

User.findById(id).then((user) => {
    if(!user){
        return console.log('Unable to find user');
    }
    console.log('User by Id', JSON.stringify(user, undefined, 2));
}).catch((err) => console.log(err));

