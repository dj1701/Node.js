"use strict";

import request from 'supertest';
import should from 'should';
import app from '../app';

const port = 4000;
let appServer;
let statusCode;

describe('GET /private/health', () => {

  before((done) => {
      appServer = app(port);
      request(appServer)
          .get('/private/health')
          .end(function(err, res) {
              if (err) {
                  return done(err);
              }
              statusCode = res.statusCode;
              done();
          });
  });

  after(() => {
    appServer.server.close();
  });

  it('Should return 200 Status for Health Check', () => {
    should(statusCode).equal(200);
  });

});
