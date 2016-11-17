"use strict";

import request from 'supertest';
import should from 'should';
import app from '../app';

const port = 4001;
let appServer;
let contentType;
let contentText;
let statusCode;

describe('GET /', () => {

  before((done) => {
      appServer = app(port);
      request(appServer)
          .get('/')
          .end(function(err, res) {
              if (err) {
                  return done(err);
              }
              statusCode = res.statusCode;
              contentType = res.header['content-type'];
              contentText = res.text;
              done();
          });
  });

  after(() => {
    appServer.server.close();
  });

  it('Should have statusCode of 200', () => {
    should(statusCode).equal(200);
  });

  it('Should have index.html in response', () => {
    should(contentType).equal('text/html; charset=UTF-8');
  });

  it('Should match String Calculator title', () => {
    contentText.should.match(/<title>Hello String Calculator<\/title>/);
  });

});
