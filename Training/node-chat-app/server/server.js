const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public/');

console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');
});

module.exports.app = (port) => {
    
    app.set('port', port || 3000);
    app.set('View Engine', 'html');

    app.get('/ping', (req, res) => {
        return res.status(200).send('Pong');
    });

    app.use(express.static(publicPath));

    app.server = server.listen(app.get('port'));

    return app;
}