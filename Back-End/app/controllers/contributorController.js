var contributorModel = require('../models/contributorModel');
var visionModel = require('../models/visionModel');
var notifs = require('../constants/notificationMessages');
var {Formatter , queryCheck} = require('../lib');

exports.visionList = function(req, res, next) {
    if (!req.params.id) res.status(200).send(Formatter(data , true));

    var contributor = contributorModel.findById(req.params.id , function(err , data){
      visionModel.find({}).
      where('_id').
      in(data.visions.map((item)=>item.visionId)).
      exec(function(err , data){
          if (err) return res.status(200).send(Formatter(err , true));

          res.status(200).send(Formatter(data));
      });
    });

};

exports.addVisionToContributor = function(req, res, next) {
    var visionId = req.body.visionId;
    if (!visionId) return res.status(200).send(Formatter(notifs.missing_required_parameters + ' , visionId' , true));

    contributorModel.findById(req.params.id , function(err , data){
        data.visions.push({
            visionId : visionId
        });
        data.save(function(err , data){
            res.status(200).send(Formatter(data));
        });
    });
};

//contributorLogIn

exports.contributorLogIn = function(req, res, next) {
    var clientInputs = req.body;
    var checkRes = queryCheck(clientInputs , ['email' , 'password']);

    if (checkRes !== true) {
        res.status(200).send(Formatter(checkRes + ' is Required' , true));
        return;
    }

    contributorModel.find({email : clientInputs.email} , function(err , data){
        if (err) {
            res.status(200).send(Formatter(err , true));
            return ;
        }

        if (data.length > 0 && data[0].password == clientInputs.password) {
            res.status(200).send(Formatter(data));
        } else {
            res.status(200).send(Formatter('Incorrect Email Or Password' , true));
        }
    });
};
