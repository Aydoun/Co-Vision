var visionModel = require('../models/visionModel');
var contributorModel = require('../models/contributorModel');
var {commit , initRepository , history , treeWalk , status } = require('./gitController');
var {Formatter} = require('../lib');
var parallel = require('async/parallel');


exports.historyList = function (req, res, next) {
    history(res , req.query);
};

exports.historyTree = function(req , res , next){
    treeWalk(res , req.query)
}

exports.visionStatus = function(req , res , next){
    status(res , req.query)
}

exports.contributorList = function (req, res, next) {
  var visionId = req.params.id;

  contributorModel.find({'visions.visionId' : visionId} , 'fullName email avatar' , function(err , data){
      if (err) return res.status(200).send(Formatter(err , true));
      res.status(200).send(Formatter(data));
  });
};

//

exports.createVision = function(req , res , next){
    parallel({
      internal : function(callback) {
        var backPromise = initRepository(req.body);

        if (typeof backPromise == "string") {
            callback(true , backPromise)
        } else {
            backPromise.then(function(commitId){
                callback(null , commitId);
            });
        }
      },
      base : function(callback) {
        var newVision = new visionModel(req.body);

      	newVision.save(function (err, data) {
      		if (err) {
              callback(true , err);
          } else {
              callback(null , data);
          }
      	});
      }
    },
    function(err, results) {
        res.status(200).send(Formatter(results));
    });
}

exports.contribute = function(req , res , next){
    parallel({
      internal : function(callback) {
        var backPromise = commit(req.body);

        if (typeof backPromise == "string") {
            callback(true , backPromise)
        } else {
            backPromise.then(function(commitId){
                callback(null , commitId);
            });
        }
      },
      base : function(callback) {
        //Empty Database Query
        callback(null , {});
      }
    },
    function(err, results) {
        res.status(200).send(Formatter(results));
    });
}
