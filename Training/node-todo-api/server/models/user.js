var {mongoose} = require('../db/mongoose');

var User = mongoose.model('User', {
    emailAddress: {
        type: String,
        required: true,
        minlegnth: 1,
        trim: true
    }
});

module.exports = {User};