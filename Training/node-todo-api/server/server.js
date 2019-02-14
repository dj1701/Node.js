var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (error) => {
//     console.log('Unable to save todo', error);
// });

var newTodo = new Todo({
    text: 'Cook another dinner',
    completed: false,
    completedAt: new Date().getTime()
});

newTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (error) => {
    console.log('Unable to save todo', error);    
});

