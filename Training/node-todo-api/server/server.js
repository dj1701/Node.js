var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

module.exports.app = (port) => {

    app.set('port', port || 4001);

    app.get('/ping', (req, res) => {
        return res.status(200).send('Pong');
    });

    app.use(bodyParser.json());

    app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
            res.send({todos});
        }, (err) => {
            res.status(400).send(err);
        });
    });

    app.post('/todos', (req, res) => {
        var todo = new Todo({
            text: req.body.text
        });

        todo.save().then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        });
    });

    app.server = app.listen(app.get('port'));

    return app;
}