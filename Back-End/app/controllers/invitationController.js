const invitationModel = require('../models/invitationModel');
const userModel = require('../models/userModel');
const visionModel = require('../models/visionModel');
const {Formatter} = require('../lib');
const parallel = require('async/parallel');

exports.waitingInvitations = function(req, res, next) {
    const defaults = {
        status : 'Waiting'
    };
    const {vision, requested} = req.query;

    if(!(vision || requested)) {
        res.status(200).send(Formatter({message:'All Fields Are Required'} , true));
        return;
    }

    const query = Object.assign({} , defaults , req.query);

    invitationModel.find(query , function(err , data){
      if (err) return res.status(200).send(Formatter(err , true));

      res.status(200).send(Formatter(data));
    });
};

exports.answerRequest = function(req, res, next) {
    const {status, requested, vision, role} = req.body;
    if (!(status && requested && vision)) {
        res.status(200).send(Formatter({message:'All Fields Are Required'} , true));
        return;
    }

    parallel({
      update : function(callback) {
        invitationModel.update({ vision:vision, requested:requested } , req.body , (err , result) => {
            if (err) {
              callback(true, result);
            }
            callback(null, result);
        });
      },
      save : function(callback) {
        if (status === 'Accepted') {
          userModel.findById(requested, (err, user) => {
              if(err){
                console.log('err ' , err);
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
          res.status(200).send(Formatter(err , true));
        } else {
          res.status(200).send(Formatter(results));
        }
    });
};
