var visionModel = require('../models/visionModel');
var {
    commit,
    initRepository,
    history,
    treeWalk,
    status,
    createBranch,
    readFileContent,
    checkoutBranch,
    getAllBranchList,
    treeSummary
} = require('./gitController');
const { Formatter } = require('../lib');
const parallel = require('async/parallel');
const series = require('async/series');

exports.historyList = function (req, res, next) {
    history(res , req.query);
};

exports.historyTree = function(req , res , next){
    var treePromise = treeWalk(res , req.query);

    treePromise.then(function(files){
        res.status(200).send(Formatter(files));
    });

    treePromise.catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
        return ;
    });
}

exports.visionSummary = function(req , res , next){
    treeSummary(req.query , (result) => res.status(200).send(Formatter(result)));
}

exports.visionStatus = function(req , res , next){
    var statusPromise = status(req.query);

    statusPromise.then(function(statuses){
        res.status(200).send(Formatter(statuses));
    })
}

exports.readFile = function(req , res , next){
    var filePromise = readFileContent(req.query);

    filePromise.then(function(fileContent){
        res.status(200).send(Formatter(fileContent));
    });

    filePromise.catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
        return ;
    });
}

exports.branchList = function(req , res , next){
    var branchPromise = getAllBranchList(req.query);

    branchPromise.then(function(data){
        res.status(200).send(Formatter(data));
    });

    branchPromise.catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
        return ;
    });
}

exports.createBranch = function(req , res , next){
    var branchPromise = createBranch(req.body);

    branchPromise.then(function(ref){

        res.status(200).send(Formatter({data : ref.name()}));
    });

    branchPromise.catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
        return ;
    });
}

exports.checkoutBranch = function(req , res , next){
    var checkoutPromise = checkoutBranch(req.body);
    checkoutPromise.then(function(message){
        res.status(200).send(Formatter({data : message}));
    });

    checkoutPromise.catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
        return ;
    });
}

exports.createVision = function(req , res , next){
    series ({
      internal : function(callback) {
        var backPromise = initRepository(req.body);

        backPromise.then(function(commitsha) {
            callback(null , commitsha);
        });

        backPromise.catch(function(err){
            callback(true , err);
        })
      },
      base : function(callback) {
        var newVision = new visionModel(req.body);

      	newVision.save(function (err, data) {
      		if (err) {
              callback(true , err);
          } else {
              req.addResults = data;
              callback(null , data);
          }
      	});
      }
    },
    function(err, results) {
        if (err) {
          res.status(200).send(Formatter(results , true));
        } else {
          next();
        }
    });
}

exports.contribute = function(req , res , next){
    var backPromise = commit(req.body);

    backPromise.then(function(commitsha){
          res.status(200).send(Formatter(commitsha));
    });

    backPromise.catch(function(err){
        res.status(200).send(Formatter(err , true));
    })
}
