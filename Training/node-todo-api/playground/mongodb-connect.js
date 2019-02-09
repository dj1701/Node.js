//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDb server', err);
    }
    console.log('Connnected to MongoDb server');
    var db = client.db();

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'DJ',
    //     age: 43,
    //     location: 'Northampton'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert User', err);
    //     }

    //     //console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
});