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
    deleteBranch,
} = require('./gitController');
const { Formatter, queryCheck } = require('../lib');
const parallel = require('async/parallel');
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

exports.visionStatus = function(req , res , next){
    var statusPromise = status(req.query);

    statusPromise.then(function(statuses){
        res.status(200).send(Formatter(statuses));
    });
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

exports.deleteBranch = function(req , res , next){
    var responsePromise = deleteBranch(req.body);

    responsePromise.then(function(message){
        res.status(200).send(Formatter({data : 'lala'}));
    });

    responsePromise.catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
        return ;
    });
}

exports.createVision = function(req , res , next){
    const body = req.body;
    const checkRes = queryCheck(body , ['creator', 'author' , 'authorMail']);

    if (!checkRes) {
        res.status(200).send(Formatter({data : 'Missing Required Parameters'} , true));
        return ;
    }

    const newVision = new visionModel(body);
    newVision.save(function (err, data) {
      	  if (err) {
            res.status(200).send(Formatter({data : err.message} , true));
            return ;
          } 
          body.repoName = data._id;
          initRepository(body)
          .then((commitSha) => {
            const response = {
              repository: commitSha,
              db: data
            };
            res.status(200).send(Formatter({data : response}));
          })
          .catch((err) => {
            res.status(200).send(Formatter({data : err} , true));
          });
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
