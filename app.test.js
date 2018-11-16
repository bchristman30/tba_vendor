const request = require('supertest');
var expect = require('chai').expect;
var app = require('./server/server');

it('it should fetch brewery list', (done) => {
    request(app)
    .get('/api/location')
    .expect(200)
    .expect((res) => {
         expect(res.body);
    }).end(done);
});