"use strict";

const path = require('path');
const express = require('express');

const app = express();

module.exports = (port) => {

  app.set('port', port || 4000);

  app.get('/dist/bundle.js', (req, res) => {
    res.sendFile('bundle.js', { root: path.join(__dirname, '/public/dist/') });
  });

  app.get('/private/health', (req, res) => {
    return res.sendStatus(200);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  app.server = app.listen(app.get('port'));

  return app;
}
