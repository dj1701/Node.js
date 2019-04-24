"use strict";

const {app} = require('./server/server');

const port = 3000;

app(port);

console.log(`Listening at http://localhost:${port}`);