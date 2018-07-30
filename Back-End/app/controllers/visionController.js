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
    mergeBranches,
    gitTest,
} = require('./gitController');
const { Formatter, queryCheck, isValidObjectId } = require('../lib');
const uuidv1 = require('uuid/v1');

exports.historyList = function (req, res, next) {
    const { id } = req.params;
    visionModel.findById(id)
    .then(vision => {
      return history(vision.systemId, req.params);
    })
    .then(logs => {
        return res.status(200).send(Formatter(logs));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });
    
};

exports.historyTree = function(req , res , next){
    const { id } = req.params;
    visionModel.findById(id)
    .then(vision => {
      return treeWalk(vision.systemId, req.query);
    })
    .then(files => {
        return res.status(200).send(Formatter(files));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });
}

exports.visionStatus = function(req , res , next){
    const { id } = req.params;
    visionModel.findById(id)
    .then(vision => {
        return status(vision.systemId);
    })
    .then(function(statuses){
        return res.status(200).send(Formatter(statuses));
    })
    .catch(err => {
        return res.status(403).send(Formatter(err.message , true));
    });
}

exports.mergeBranches = function(req , res , next){
    if (!req.query.sourceBranch) {
      return res.status(403).send(Formatter({data : 'Missing Required Parameters'} , true));
    }

    return mergeBranches(req)
    .then(data => {
      return deleteBranch({
        id: req.params.id,
        branchName: req.query.sourceBranch
      })
      // res.status(200).send(Formatter('oki'));
    })
    // catch(err => {
    //
    // });
    // catch(err => {
    //   res.status(200).send(Formatter(err.message));
    // });
}

exports.readFile = function(req , res , next){
    const { id } = req.params;
    visionModel.findById(id)
    .then(vision => {
        return readFileContent(vision.systemId, req.query);
    })
    .then(function(fileContent){
        return res.status(200).send(Formatter(fileContent));
    })
    .catch(err => {
        return res.status(403).send(Formatter(err.message , true));
    });
}

exports.branchList = function(req , res , next){
    const { id } = req.params;
    visionModel.findById(id)
    .then(vision => {
        return getAllBranchList(vision.systemId);
    })
    .then(function(branches){
        return res.status(200).send(Formatter(branches));
    })
    .catch(err => {
        return res.status(403).send(Formatter(err.message , true));
    });
}

exports.createBranch = function(req , res , next){
    const { id } = req.params;
    const checkRes = queryCheck(req.body , ['branchName' ]);
    if (!checkRes) {
        return res.status(403).send(Formatter({data : 'Missing Required Parameters'} , true));
    }

    visionModel.findById(id)
    .then(vision => {
        return createBranch(vision.systemId, req.body.branchName);
    })
    .then(function(ref){
        return res.status(200).send(Formatter({data : ref.name()}));
    })
    .catch(err => {
        return res.status(403).send(Formatter(err.message , true));
    });

}

exports.checkoutBranch = function(req , res , next){
    const { id } = req.params;
    if (queryCheck(req.body , ['branchName']) !== true) {
        return res.status(403).send(Formatter({data : 'Missing Required Parameters'} , true));
    }

    visionModel.findById(id)
    .then(vision => {
        return checkoutBranch(vision.systemId, req.body.branchName);
    })
    .then(function(message){
        return res.status(200).send(Formatter({data : message}));
    })
    .catch(err => {
        return res.status(403).send(Formatter(err.message , true));
    });
}

exports.removeBranch = function(req , res , next){
    const { id } = req.params;
    if (queryCheck(req.body , ['branchName']) !== true) {
      return res.status(403).send(Formatter({data : 'Missing Required Parameters'} , true));
    }

    visionModel.findById(id)
    .then(vision => {
        return deleteBranch(vision.systemId, req.body.branchName);
    })
    .then(function(){
        return res.status(200).send(Formatter({data : {}}));
    })
    .catch(err => {
        return res.status(403).send(Formatter(err.message , true));
    });
}

exports.visionSummary = function(req , res , next){
    const visionId = req.params.id;
    let foundVision = {};
    visionModel.findById(visionId)
    .then(vision => {
        if(vision) {
            foundVision = vision;
            return treeSummary(req.query.branchName, vision.systemId);
        }
    })
    .then(summary => {
      return res.status(200).send(Formatter(Object.assign({}, summary, {
        likes: foundVision.likes.length,
        vision: {
          title: foundVision.title,
          description: foundVision.description,
          id: foundVision._id,
          updatedAt: foundVision.updatedAt
        }
      })));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });
}

exports.createVision = function(req , res , next){
    const body = req.body;
    const checkRes = queryCheck(body , ['author' , 'authorMail', 'title']);
    if (!checkRes) {
        return res.status(403).send(Formatter({data : 'Missing Required Parameters'} , true));
    }
    const randomId = uuidv1()

    body.creator = req.tokenData.iss;
    body.systemId = randomId;
    initRepository(body)
    .then(() => {
        return randomId;
    })
    .then((id) => {
        const newVision = new visionModel(body);
        return newVision.save();
    })
    .then(data => {
        req.visionId = data._id;
        req.repoResponse = data;
        next();
    })
    .catch((err) => {
        return res.status(403).send(Formatter({data : err.message} , true));
    });
}

/*
  Vision API
*/

exports.addLike = function(req , res , next){
    const userId = req.tokenData.iss;
    const visionId = req.params.id;
    let foundUserIndex;

    visionModel.findById(visionId)
    .then(data => {
      foundUserIndex = data.likes.findIndex((likeItem => likeItem.userId == userId));
      if (foundUserIndex >= 0) {
        data.likes.splice(foundUserIndex, 1);
      } else {
        data.likes.push({ userId });
      }
      return data.save();
    })
    .then(data => {
      return  res.status(200).send(
        Formatter({ add: foundUserIndex < 0, _id: data._id })
      );
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });
}

exports.unRegister = function(req , res , next){
    if(!isValidObjectId(req.params.id) || !req.body.creator) {
      return res.status(403).send(Formatter({message:'All Fields Are Required'} , true));
    }
    const userId = req.tokenData.iss;
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