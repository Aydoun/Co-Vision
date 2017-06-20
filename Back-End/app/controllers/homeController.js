var {
    gitTest
} = require('./gitController');

exports.get = function (req, res, next) {
    return res.status(200).send({message:"Welcome To CO-VISION API"});
};

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
