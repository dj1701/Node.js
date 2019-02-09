console.log('Starting App');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

// console.log('Result: ', notes.add(9, -2));

// console.log(_.isString(true));
// console.log(_.isString('DJ'));

// var filteredArray = _.uniq(["DJ", 1, "DJ", 1, 2, 3,4]);
// console.log(filteredArray);

// var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username}!  You are ${notes.age}`, function(err){
//     if(err){
//         console.log('Unable to write to file');
//     }
// });

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

var argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note',{
        title: titleOptions
    })
    .command('remove', 'Remove a note',{
        title: titleOptions
    })
    .help()
    .argv;

var command = argv._[0];

console.log("Command: ", command);

if (command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if(note){
        console.log('Note created');
        notes.logNote(note);
        return;
    }
    console.log('Note title already in use');
} else if (command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => {
        console.log(notes.logNote(note));
    });
} else if (command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        console.log('Note read');
        notes.logNote(note);
        return;
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recongised');
}