"use strict";

import request from 'supertest';
import { expect } from 'chai';
import app from '../app';

const port = 4000;
let appServer;
let statusCode;
let responseText;

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
    expect(statusCode).to.be.equal(200);
  });

});

describe('GET /invalid/url', () => {
  before((done) => {
      appServer = app(port);
      request(appServer)
          .get('/invalid/url')
          .end(function(err, res) {
              if (err) {
                  return done(err);
              }
              statusCode = res.statusCode;
              responseText = res.text;
              done();
          });
  });

  after(() => {
    appServer.server.close();
  });

  it('Should return 404 Status for Health Check', () => {
    expect(statusCode).to.be.equal(404);
  });

  it('Should return http response body with message of "Not Found"', () => {
    expect(responseText).to.be.equal('Not Found');
  });
});

describe.only('GET Error', () => {
  before((done) => {
      appServer = app(port);
      request(appServer)
          .get('jshdflkasdjh')
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

  it('Should return 400 Status from catch error handler', () => {
    expect(statusCode).to.be.equal(400);
  });
});
