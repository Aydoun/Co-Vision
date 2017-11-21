const chai = require('chai');
const chaiHttp = require('chai-http');
const Application = require('../../app');
const appConfig = require('../config');
const expect = chai.expect;
const app = Application.app;
const prefix = `http://${appConfig.hostname}:${appConfig.port}/api`;

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
});
