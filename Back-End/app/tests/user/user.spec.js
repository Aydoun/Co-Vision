const chai = require('chai');
const sinon = require('sinon');
const userModel = require('../../models/userModel');
const expect = chai.expect; 

describe('Arithmetic 2', function() {
  it('Trivialissimo', function(done) {
    //var UserMock = new userModel();
    userModel.find({}, (err, result) => {
        console.log(results, 'Results');
        //expect(result.length).to.equal(3);
        done();
    });
    // var expectedResult = {status: true, todo: []};
    // TodoMock.expects('find').yields(null, expectedResult);
    // Todo.find(function (err, result) {
    //     TodoMock.verify();
    //     TodoMock.restore();
    //     expect(result.status).to.be.true;
    //     done();
    // });
  });
});
