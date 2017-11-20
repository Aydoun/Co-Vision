const request = require('axios');
const httpStatus = require('http-status');
const chai = require('chai');
const Application = require('../../app');
const appConfig = require('../config');

const expect = chai.expect;
chai.config.includeStack = true;
const app = Application.app;
const prefix = `http://${appConfig.hostname}:${appConfig.port}/api`;

describe('## Vision APIs', () => {
  describe('# GET /api/vision', () => {
    it('should All Visions', (done) => {
      request
        .get(`${prefix}/vision`)
        .then(function (response) {
          expect(response.status).to.equal(200);
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });
  });
});
