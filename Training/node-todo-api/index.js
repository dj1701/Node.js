"use strict";

const {app} = require('./server/server');

const port = 4001;

app(port);

console.log(`Listening at http://localhost:${port}`);