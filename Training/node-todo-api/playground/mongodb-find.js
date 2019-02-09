//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDb server', err);
    }
    console.log('Connnected to MongoDb server');
    var db = client.db();

    // db.collection('Todos').find({_id: new ObjectID('5c5ee95bf294a90a9c5ef2a9')}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
        
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });
    
    db.collection('Users').find({name: 'DJ'}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });
    
    //client.close();
});