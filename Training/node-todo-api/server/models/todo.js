var {mongoose} = require('../db/mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlegnth: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};