"use strict";

const server = require('./server/server');

const port = 4001;

server(port);

console.log('Listening at http://localhost:4001');