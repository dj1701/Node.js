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

  it('Should have content type of text/html; charset=UTF-8', () => {
    should(contentType).equal('text/html; charset=UTF-8');
  });

  it('Should match String Calculator title', () => {
    contentText.should.match(/<title>Hello String Calculator<\/title>/);
  });

});

describe('GET /bundle.js', () => {

  before((done) => {
      appServer = app(port);
      request(appServer)
          .get('/dist/bundle.js')
          .end(function(err, res) {
              if (err) {
                  return done(err);
              }
              statusCode = res.statusCode;
              contentType = res.header['content-type'];
              done();
          });
  });

  after(() => {
    appServer.server.close();
  });

  it('Should have statusCode of 200', () => {
    should(statusCode).equal(200);
  });

  it('Should have application/javascript in content type', () => {
    should(contentType).equal('application/javascript');
  });

});

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
