const visionModel = require('../models/visionModel');
const userModel = require('../models/userModel');
const parallel = require('async/parallel');
const {
    commit,
    initRepository,
    history,
    treeWalk,
    status,
    createBranch,
    readFileContent,
    treeSummary,
    checkoutBranch,
    getAllBranchList,
    deleteBranch,
} = require('./gitController');
const { Formatter, queryCheck, isValidObjectId } = require('../lib');
/*
 Git API
*/

exports.historyList = function (req, res, next) {
    history(res , req.params);
};

exports.historyTree = function(req , res , next){
    treeWalk(res , req)
    .then(function(files){
        res.status(200).send(Formatter(files));
    })
    .catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
    });
}

exports.visionStatus = function(req , res , next){
    status(req.query).then(function(statuses){
        res.status(200).send(Formatter(statuses));
    });
}

exports.readFile = function(req , res , next){
    readFileContent(req.query).then(function(fileContent){
        res.status(200).send(Formatter(fileContent));
    })
    .catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
    });
}

exports.branchList = function(req , res , next){
    getAllBranchList(req.params).then(function(data){
        res.status(200).send(Formatter(data));
    })
    .catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
    });
}

exports.createBranch = function(req , res , next){
    createBranch(req.body).then(function(ref){
        res.status(200).send(Formatter({data : ref.name()}));
    })
    .catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
    });
}

exports.checkoutBranch = function(req , res , next){
    checkoutBranch(req.body).then(function(message){
        res.status(200).send(Formatter({data : message}));
    })
    .catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
    });
}

exports.deleteBranch = function(req , res , next){
    deleteBranch(req.body).then(function(message){
        res.status(200).send(Formatter({data : 'lala'}));
    })
    .catch(function(err){
        res.status(200).send(Formatter({data : err.message} , true));
    });
}

exports.visionSummary = function(req , res , next){
    const visionId = req.params.id;
    visionModel.findById(visionId)
    .then(vision => {
      return treeSummary(res , req, vision);
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });

}

exports.createVision = function(req , res , next){
    const body = req.body;
    const checkRes = queryCheck(body , ['author' , 'authorMail', 'title']);
    if (!checkRes) {
        return res.status(400).send(Formatter({data : 'Missing Required Parameters'} , true));
    }

    body.creator = req.userId;

    const newVision = new visionModel(body);
    newVision.save(function (err, data) {
      	  if (err) {
            res.status(200).send(Formatter({data : err.message} , true));
            return ;
          }
          body.id = data._id;
          initRepository(body)
          .then((commitSha) => {
            const response = {
              repository: commitSha,
              db: data
            };
            req.visionId = data._id;
            req.repoResponse = response;
            next();
          })
          .catch((err) => {
            res.status(200).send(Formatter({data : err} , true));
          });
    });
}

exports.contribute = function(req , res , next){
    commit(req.body).then(function(commitsha){
        return res.status(200).send(Formatter(commitsha));
    })
    .catch(function(err){
        return res.status(403).send(Formatter(err , true));
    });
}

/*
  Vision API
*/

exports.addLike = function(req , res , next){
    const userId = req.userId;
    const visionId = req.params.id;

    visionModel.findById(visionId)
    .then(data => {
      const foundUser = data.likes.find((likeItem => likeItem.userId == userId));
      if (typeof foundUser !== 'undefined') {
        throw new Error('User already registered');
      }

      data.likes.push({ userId });
      return data.save();
    })
    .then(data => {
      return  res.status(200).send(Formatter(data));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });
}

exports.unRegister = function(req , res , next){
    if(!isValidObjectId(req.params.id) || !req.body.creator) {
      return res.status(200).send(Formatter({message:'All Fields Are Required'} , true));
    }
    const userId = req.userId;
    const visionId = req.params.id;

    parallel({
      vision: callback => {
        if (userId === req.body.creator) {
          // Desactivate Vision From Database
          visionModel.update({_id: visionId}, {status : 'Inactive'})
          .then(data => {
            callback(null, true);
          })
          .catch(err => {
            callback(err, err.message);
          });
        } else {
          callback(null, true);
        }
      },
      user: callback => {
        userModel.findById(userId)
        .then(data => {
          const foundIndex = data.visions.findIndex(elem => elem.visionId == visionId);
          if (foundIndex >= 0) {
            data.visions.splice(foundIndex, 1);
            data.save(function(err , data) {
                if(err) {
                  callback(err, err.message);
                }
                callback(null, true);
            });
          } else {
            callback(null, true);
          }
        })
        .catch(err => {
          callback(err, err.message);
        });
      }
    }, (err, results) => {
        if(err) {
          res.status(403).send(Formatter(results));
        }
        res.status(200).send(Formatter(results));
    });
}
