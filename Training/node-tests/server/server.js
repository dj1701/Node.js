const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    res.status(200).send([
        {name: 'John', age: 23},
        {name: 'DJ', age: 43},
        {name: 'Riker', age: 57}
    ]);
});

app.listen(3000);

module.exports.app = app;