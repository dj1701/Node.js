require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');

var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

module.exports.app = (port) => {

    app.set('port', port || 4001);

    app.get('/ping', (req, res) => {
        return res.status(200).send('Pong');
    });

    app.use(bodyParser.json());

    app.get('/todos', authenticate, (req, res) => {
        Todo.find({
            _creator: req.user._id
        }).then((todos) => {
            res.send({todos});
        }, (err) => {
            res.status(400).send(err);
        });
    });

    app.get('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;

        if(!ObjectId.isValid(id)){
            return res.status(404).send({status: 'Invalid Id'});
        }

        Todo.findOne({
            _id: id,
            _creator: req.user.id
        }).then((todo) => {
            if(!todo){
                return res.status(404).send({status: 'todo not found'});
            }
            res.send({todo});
        }).catch((err) => {
            console.log(err);
            res.status(400).send();
        });
    });

    app.post('/todos', authenticate, (req, res) => {
        var todo = new Todo({
            text: req.body.text,
            _creator: req.user._id
        });

        todo.save().then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        });
    });

    app.delete('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;

        if(!ObjectId.isValid(id)){
            return res.status(404).send({status: 'Invalid Id'});
        }

        Todo.findOneAndDelete({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
            if(!todo) {
                return res.status(404).send({status: 'todo not found'});
            }

            res.send({todo});
        }).catch((err) => {
            console.log(err);
            res.status(400).send();
        });
    });

    app.patch('/todos/:id', authenticate, (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);

        if(!ObjectId.isValid(id)){
            return res.status(404).send({status: 'Invalid Id'});
        }

        if(_.isBoolean(body.completed) && body.completed){
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, {$set: body}, {new: true}).then((todo) => {
            if(!todo){
                return res.status(404).send();
            }

            res.send({todo});
        }).catch((err) => {
            res.status(400).send();
        });
    });

    app.post('/users', (req, res) => {
        var body = _.pick(req.body, ['emailAddress', 'password']);
        var user = new User(body);

        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((err) => {
            res.status(400).send(err);
        });
    });

    app.get('/users/me', authenticate, (req, res) => {
        res.send(req.user);
    });

    app.post('/users/login', (req, res) => {
        var body = _.pick(req.body, ['emailAddress', 'password']);
        User.findByCredentials(body.emailAddress, body.password).then((user) => {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(user);
            });
        }).catch((err) => {
            res.status(400).send(err);
        });
    });

    app.delete('/users/me/token', authenticate, (req, res) => {
        req.user.removeToken(res.token).then(() => {
            res.status(200).send();
        }, () => {
            res.status(400).send();
        });
    });

    app.server = app.listen(app.get('port'));

    return app;
}