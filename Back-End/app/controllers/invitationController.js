const invitationModel = require('../models/invitationModel');
const userModel = require('../models/userModel');
const visionModel = require('../models/visionModel');
const { Formatter, queryCheck, isValidObjectId } = require('../lib');
const parallel = require('async/parallel');

exports.userWaitingInvitations = function(req, res, next) {
    const defaults = {
        status: 'Waiting',
        requested: req.userId
    };

    const query = Object.assign({}, defaults);
    if (isValidObjectId(req.query.vision)) {
      query.vision = req.query.vision;
    }

    invitationModel.find(query)
    .then((results) => {
      res.status(200).send(Formatter(results));
    })
    .catch((err) => {
      res.status(200).send(Formatter(err, true));
    });
};

exports.visionWaitingInvitations = function(req, res, next) {
    userModel.findById(req.userId)
    .then((user) => {
      // extract All Visions Id
      const adminVisions = user.visions.filter(vs => vs.role !== 'Common').map(vs => vs._id);
      if (adminVisions.length > 0) {
        invitationModel.find(
          { status:'Waiting', "_id": { "$in": adminVisions }
        })
        .then(data => {
          return res.status(200).send(Formatter(data));
        })
        .catch(err => {
          return res.status(403).send(Formatter(err , true));
        });
      } else {
        return res.status(200).send(Formatter([]));
      }
    })
    .catch((err) => {
      return res.status(403).send(Formatter(err , true))
    });
};

exports.addJoinRequest = (req, res, next) => {
    const { vision, requested, motivation } = req.body;
    const check = queryCheck(req.body, ['vision', 'requested']);
    if (!check) {
      return res.status(403).send(Formatter({message:'All Fields Are Required'} , true));
    }
    const requester = req.userId;
    let userName = '';

    userModel.findById(requester)
    .then(user => {
      userName = user.fullName;
      return user.fullName;
    })
    .then(userName => {
      return visionModel.findById(vision)
    })
    .then(foundVision => {
      return {
        visionName: foundVision.title,
        visionAvatar: foundVision.avatar
      };
    })
    .then(visionData => {
      const newRequest = {
        vision,
        requested,
        requester,
        motivation,
      	userName,
      	...visionData
      }
      const requestModel = new invitationModel(newRequest);
      return requestModel.save()
    })
    .then(request => {
      return res.status(200).send(Formatter(request));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err , true));
    });
};

exports.answerRequest = function(req, res, next) {
    const { status, vision, role } = req.body;
    const check = queryCheck(req.body, ['vision', 'status']);

    if (!(check && isValidObjectId(req.body.vision))) {
      return res.status(403).send(Formatter({message:'All Fields Are Required'} , true));
    }
    const userId = req.userId;

    parallel({
      update : function(callback) {
        invitationModel.update({ vision:vision, requested:userId } , { status: req.body.status } , (err , result) => {
            if (err) {
              callback(true, result);
            }
            callback(null, result);
        });
      },
      save : function(callback) {
        if (status === 'Accepted') {
          userModel.findById(userId, (err, user) => {
              if(err){
                callback(err);
                return ;
              }
              visionModel.findById(vision, (err, visionObj) => {
                  if(err){
                    callback(err);
                    return ;
                  }

                  user.visions.push({
                    visionId:vision,
                    visionName:visionObj.title,
                    role: role || 'Common',
                  });
                  user.save((err, data) => {
                      callback(null, data);
                  });
              });
          });
        } else {
            callback(null);
        }
      }
    },
    function(err, results) {
        if (err) {
          return res.status(403).send(Formatter(err , true));
        } else {
          return res.status(200).send(Formatter(results));
        }
    });
};
