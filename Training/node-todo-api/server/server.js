var express = require('express');
var bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

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

    app.get('/todos/:id', (req, res) => {
        var id = req.params.id;

        if(!ObjectId.isValid(id)){
            return res.status(404).send({status: 'Invalid Id'});
        }

        Todo.findById(id).then((todo) => {
            if(!todo){
                return res.status(404).send({status: 'todo not found'});
            }
            res.send({todo});
        }).catch((err) => {
            console.log(err);
            res.status(400).send();
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

    app.delete('/todos/:id', (req, res) => {
        var id = req.params.id;

        if(!ObjectId.isValid(id)){
            return res.status(404).send({status: 'Invalid Id'});
        }

        Todo.findOneAndRemove(id).then((todo) => {
            if(!todo) {
                return res.status(404).send({status: 'todo not found'});
            }

            res.send(todo);
        }).catch((err) => {
            console.log(err);
            res.status(400).send();
        });
    });

    app.server = app.listen(app.get('port'));

    return app;
}