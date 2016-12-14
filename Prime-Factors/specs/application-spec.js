"use-strict";

import request from 'supertest';
import should from 'should';
import app from '../app';

const port = 4001;
let statusCode;
let appServer;
let contentText;
let contentType;

describe('GET /private/health', () => {

  before((done) => {
      appServer = app(port);
      request(appServer)
        .get('/private/health')
        .end(function(err, res){
            if(err) {
              return done(err);
            }
            statusCode = res.statusCode;
            done();
        });
  });

  after(() => {
    appServer.server.close();
  });

  it('Should return 200 status for health check', () =>{
    should(statusCode).equal(200);
  });

});

describe('GET /', () => {

  before((done) => {
    appServer = app(port);
    request(appServer)
      .get('/')
      .end(function(err, res){
        if(err) {
          return done(err);
        }
        statusCode = res.statusCode;
        contentText = res.text;
        done();
      });

  });

  after(() => {
    appServer.server.close();
  });

  it('Should return 200 status for root request', () =>{
    should(statusCode).equal(200);
  });

  it('Should match String Calculator title', () => {
    contentText.should.match(/<title>Prime Factors<\/title>/);
  });
});

describe('GET /dist/bundle.js', () => {

  before((done) => {
    appServer = app(port);
    request(appServer)
      .get('/dist/bundle.js')
      .end(function(err, res){
        if(err){
          return done(err);
        }
        statusCode = res.statusCode;
        contentType = res.header['content-type'];
        done();
      });
  });

  after(() => {
    appServer.server.close();
  })

  it('Should return 200 status for bundle.js', () => {
    should(statusCode).equal(200);
  });

  it('Should have application/javascript in content type', () => {
    should(contentType).equal('application/javascript');
  });
})
