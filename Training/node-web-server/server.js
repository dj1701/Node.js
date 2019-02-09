const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.set('View Engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:  ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: "Maintenance Page"
//     });
// });

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    //res.send("<h1>Hello Express!<h1:>");
    // res.send({
    //     name: "DJ",
    //     likes: [
    //         "Running",
    //         "Eating"
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle: "Home Page",
        welcomeMessage: "Welcome"
    });
});

app.get("/about", (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page"
    });
});

app.get("/projects", (req, res) => {
    res.render('projects.hbs', {
        pageTitle: "Projects"
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Unable to process bad request"
    });
});

app.listen(3000, () => {
    console.log('Server is up listening on port 3000');
});