var {
    gitTest
} = require('./gitController');

var {Formatter} = require('../lib');

exports.testify = function(req , res , next){
    var testPromise = gitTest(req.query);

    testPromise.then(function(msg){
        res.status(200).send(Formatter(msg));
    })

    testPromise.catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
        return ;
    });
}
