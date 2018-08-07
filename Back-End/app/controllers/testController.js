const {
    gitTest
} = require('./gitController');
const { Formatter } = require('../lib');

exports.testify = function(req , res , next){
   gitTest('138011e0-96fe-11e8-af0e-41ce4683de5f', req.query.branchName)
   .then((data) => {
    return res.status(403).send(Formatter(err.message));
   })
   .catch(err => {
    return res.status(403).send(Formatter(err.message , true));
   });
    
}

