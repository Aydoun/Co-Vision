const visionModel = require('../models/visionModel');
const {
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
const { Formatter, queryCheck, isValidObjectId } = require('../lib');
/*
 Git API
*/

exports.historyList = function (req, res, next) {
    history(res , req.query);
};

exports.historyTree = function(req , res , next){
    treeWalk(res , req.query).then(function(files){
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
    getAllBranchList(req.query).then(function(data){
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

exports.createVision = function(req , res , next){
    const body = req.body;
    const checkRes = queryCheck(body , ['creator', 'author' , 'authorMail']);

    if (!checkRes) {
        return res.status(200).send(Formatter({data : 'Missing Required Parameters'} , true));
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
    commit(req.body).then(function(commitsha){
          res.status(200).send(Formatter(commitsha));
    })
    .catch(function(err){
        res.status(200).send(Formatter(err , true));
    });
}

/*
  Vision API
*/

exports.addLike = function(req , res , next){
    if(!(isValidObjectId(req.query.userId) && isValidObjectId(req.params.id))) {
        return res.status(200).send(Formatter({message:'All Fields Are Required'} , true));
    }
    const userId = req.query.userId;
    const visionId = req.params.id;

    visionModel.findById(visionId , function(err , data){
        if (err) return res.status(200).send(Formatter(err , true));
        const foundUser = data.likes.find((likeItem => likeItem.userId == userId));

        if (typeof foundUser === 'undefined') {
            // First Time To Like The Vision
            data.likes.push({ userId });
            data.save(function(err , _data){
                res.status(200).send(Formatter(_data));
            });
        } else {
            res.status(200).send(Formatter('', true));
        }    
    });
}