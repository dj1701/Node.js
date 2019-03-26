const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        required: true,
        minlegnth: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'emailAddress']);
};

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function(token) {
    var user = this;
    
    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }
    console.log('decoded', decoded);
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function(emailAddress, password) {
    var User = this;

    return User.findOne({emailAddress}).then((user) => {
        if(!user){
            return Promise.reject();    
        }

        return new Promise((resolve, reject) => {
            var hashedPassword = user.password;
            bcrypt.compare(password, hashedPassword, (err, res) => {
                if(res){
                   return resolve(user);
                }
                return reject();
            });
        });
    });
};

UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err){
                   console.log('Error with hashing password');
                }
                user.password = hash;
                next();
            });
        });       
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};