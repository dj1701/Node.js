const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public/');

console.log(publicPath);

var app = express();
module.exports.app = (port) => {
    
    app.set('port', port || 3000);
    app.set('View Engine', 'html');

    app.get('/ping', (req, res) => {
        return res.status(200).send('Pong');
    });

    app.use(express.static(publicPath));

    app.server = app.listen(app.get('port'));

    return app;
}