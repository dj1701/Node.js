//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDb server', err);
    }
    console.log('Connnected to MongoDb server');
    var db = client.db();

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c5ee95bf294a90a9c5ef2a9')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //      returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c5c9feefb3ff60e58c9ae1a')
    }, {
        $set: {
            name: 'DJ'
        },
        $inc: {
            age: 1
        }
    }, {
         returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
        
    //client.close();
});