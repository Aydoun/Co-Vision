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

describe('## Vision APIs', () => {
  beforeEach((done) => {
    done();
  });
  describe('# GET /api/vision', () => {
    it('it should GET all the visions', (done) => {
      chai.request(`${prefix}`)
          .get(`/vision`)
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
            creator: "111111111111111111111111",
            author: faker.name.firstName(),
            description: faker.lorem.sentence(),
            authorMail: faker.internet.email(),
            title: faker.random.word()
        }
        chai.request(`${prefix}`)
            .post('/vision')
            .send(vision)
            .end((err, res) => {
              // console.log(res);
                expect(err).to.be.null;
                res.should.have.status(200);
              done();
            });
      });
  });

  describe('/PUT/:id vision', () => {
      it('it should UPDATE a vision given the id', (done) => {
        const vision = new Vision({
            creator: "111111111111111111111111",
            author: faker.name.firstName(),
            description: faker.lorem.sentence(),
            authorMail: faker.internet.email(),
            title: faker.random.word()
        });
        vision.save((err, book) => {
                chai.request(`${prefix}`)
                .put('/vision/' + vision.creator)
                .send({ title: "Test Title" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.book.should.have.property('title').eql('Test Title');
                  done();
                });
          });
      });
  });
});
