const mongoose = require("mongoose");
const Vision = require('../models/visionModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const appConfig = require('../config');

const expect = chai.expect;
const prefix = `http://${appConfig.hostname}:${appConfig.port}/api`;

let should = chai.should();

chai.use(chaiHttp);
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1YTI1MWQxM2Y0NTc1YTNlZDAyNTYxZmUiLCJleHAiOjE1MTMzMDk4NDA2MDB9.T_l9n3gNfxaCnHLtzj2rsh_VeglOtA8Mxs9dMQvtSQ4';


describe('## Vision APIs', () => {
  beforeEach((done) => {
    done();
  });
  describe('# GET /api/vision', () => {
    it('it should GET all the visions', (done) => {
      chai.request(`${prefix}`)
          .get(`/vision`)
          .set('x-access-token', token)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
    });
  });
  /*
  * Test the /POST route
  */
  describe('/POST vision', () => {
      it('it should create new vision', (done) => {
        let vision = {
            author: faker.name.firstName(),
            description: faker.lorem.sentence(),
            authorMail: faker.internet.email(),
            title: faker.random.word()
        }
        chai.request(`${prefix}`)
            .post('/vision')
            .set('x-access-token', token)
            .send(vision)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
              done();
            });
      });
  });


});
