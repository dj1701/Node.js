"use strict";

const path = require('path');
const express = require('express');
const url = require('url');

const app = express();

module.exports = (port) => {

  app.set('port', port || 4000);

  app.get("/private/health", (req, res) => {
    res.sendStatus(200);
  });

  // catch 404 handler
  app.get('*', function(req, res, next) {
    var requestRrl = req.originalUrl;
    try {
        url.parse(requestRrl);
        console.log("parsed " + requestRrl);
    }
    catch (e) {
        var err = new Error();
        err.status = 400;
        console.error(e);
        next(err);
    }

    var err = new Error();
    err.status = 404;
    next(err);
  });

  process.on('uncaughtException', (err) => {
    console.log('whoops! There was an uncaught error', err);
    process.exit(1);
  });

  // app.listen(4000, 'localhost', (err) => {
  //    if (err) {
  //        console.log(err);
  //        return;
  //    }
  //
  //    console.log('Listening at http://localhost:4000');
  // });

  app.server = app.listen(app.get('port'));

  return app;
}
