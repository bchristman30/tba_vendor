const request = require('supertest');
var expect = require('chai').expect;
var app = require('./server/server');
var fs = require('mz/fs')

describe('location',()=>{
    describe('/api/location',()=>{
        it('it should fetch brewery list', (done) => {
            request(app)
            .get('/api/location')
            .expect(200)
            .expect((res) => {
                //console.log(res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.all.keys('error', 'result','text');
                expect(res.body).to.have.property('result').to.be.an('array').to.have.lengthOf.above(0);
                //expect(res.body).to.include({error:false});    
            }).end(done);
        });
    });
  
    describe('/api/location/3',()=>{
        it('it should fetch a particular brewery detail', (done) => {
            request(app)
            .get('/api/location/3')
            .expect(200)
            .expect((res) => {
               // console.log(res.body);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.all.keys('error','result','text');
                expect(res.body).to.have.property('result').to.be.an('array').to.have.lengthOf(1);
               // expect(res.body).to.include({error:false});    
            }).end(done);
        });
    });

    // describe('POST /api/beer/location', function() {
    //     it('it should create beer in a brewery', function(done) {
    //         const filePath = `${__dirname}/server/public/tuborg.jpeg`;
    //         fs.exists(filePath).then(function (exists) {
    //             if (!exists) throw new Error('file does not exist'); 
    //             request(app)
    //             .post('/api/beer/location')
    //             .field('Alchohol_content', '5%')
    //             .field('beer_description', "Tuborg was originally created by Lieutenant Colonel James ('Jim') Herbert Porter (b. 1892, Burton upon Trent), a third-generation brewer at Newcastle Breweries, in 1927.")
    //             .field('price', '2')
    //             .field('location_id',4)
    //             .field('category',[4,5])
    //             .field('name', 'Tuborg')
    //             .attach('beer_logo', filePath)
    //             .expect(function(res) {
    //                 console.log(res.body);
    //                 expect(res.body).to.be.an('object');
    //                 expect(res.body).to.have.all.keys('error','result','text');
    //             }).end(done);
    //           });
    //          });
    //   });

});
