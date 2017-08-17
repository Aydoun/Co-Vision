var {
    gitTest
} = require('./gitController');

var {Formatter} = require('../lib');

exports.testify = function(req , res , next){
    gitTest().then(function(){
        console.log('res');
        res.end('yes');
    });
}
