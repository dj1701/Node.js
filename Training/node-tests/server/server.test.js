const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {

    describe('GET /', () => {
        it('should return 404 Page not found', (done) => {
            request(app)
                .get('/')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page not found'
                    });
                })
                .end(done);
        });
    });

    describe('GET /Users', () => {
        it('should return object containing DJ', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        name: 'DJ',
                        age: 43
                    });
                })
                .end(done);
        });
    });
});