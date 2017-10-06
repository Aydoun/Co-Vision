var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
//require('sinon-as-promised');
require('sinon-mongoose');

// Require index.js so the Book model will be declared
var Model = require('../models/feedbackModel');

describe('Callbacks example', function () {
  var ModelMock = sinon.mock(Model);

  it('#findByAuthor', (done) => {
    //   ModelMock
    //   .expects('find').withArgs({})
    //   .chain('exec')
    //   .resolves(null);
    ModelMock.findByAuthor('AUTHOR').then(function (result) {
      console.log(result, 'result');
      assert.equal(result, 'RESULT');
      done();
    });
    // ModelMock.find()
    // .exec(function(err, result) {
    //     console.log(result);
    //     assert.equal(1+1, 2);
    // });
  });
});