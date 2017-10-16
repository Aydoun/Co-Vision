var {
    gitTest
} = require('./gitController');

var {Formatter} = require('../lib');
/**
* List Visions Summary For a User
* @param {String} test - test
* @return {Object} returns test
*/
exports.testify = function(req , res , next){
    gitTest().then(function(){
        console.log('res');
        res.end('yes');
    });
}
