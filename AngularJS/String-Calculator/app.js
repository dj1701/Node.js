"use strict";

const path = require('path');
const express = require('express');

const app = express();

module.exports = (port) => {

  app.set('port', port || 4000);

  app.get("/private/health", (req, res) => {
    res.sendStatus(200);
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
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
