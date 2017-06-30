var visionModel = require('../models/visionModel');
var UserModel = require('../models/userModel');
var notifs = require('../constants/notificationMessages');
var config = require('../config');
var {Formatter , queryCheck , picking , generateToken} = require('../lib');

exports.visionList = function(req, res, next) {
    if (!req.params.id) res.status(200).send(Formatter(data , true));

    var contributor = UserModel.findById(req.params.id , function(err , data){
      visionModel.find({}).
      where('_id').
      in(data.visions.map((item)=>item.visionId)).
      exec(function(err , data){
          if (err) return res.status(200).send(Formatter(err , true));

          res.status(200).send(Formatter(data));
      });
    });

};

exports.addVisionToUser = function(req, res, next) {
    var visionId = req.body.visionId;
    if (!visionId) return res.status(200).send(Formatter(notifs.missing_required_parameters + ' , visionId' , true));

    UserModel.findById(req.params.id , function(err , data){
        data.visions.push({
            visionId : visionId
        });
        data.save(function(err , data){
            res.status(200).send(Formatter(data));
        });
    });
};

exports.LogIn = function(req, res, next){
    UserModel.findOne({
      email: req.body.email
    }, (err, user) => {
        if (err) {
          throw err;
        }
        if (!user) {
          res.status(200).send(Formatter({data : 'Authentication failed. User not found.'}, true));
        } else {
          user.comparePassword(req.body.password, (err2, isMatch) => {
            if (err2) {
                console.log(err2);
                res.status(200).send(Formatter({data : 'Authentication failed'} , true));
            }
            else if (!isMatch) {
                res.status(200).send(Formatter({ data : 'Authentication failed, Wrong password'}, true));
            } else {
                res.status(200).send(Formatter({ token: generateToken(user.id, config.secret) }));
            }
          });
        }
    });
}

exports.Register = function(req, res, next){
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      res.status(200).send(Formatter('all fields are required', true));
    }
    UserModel.findOne({ email }, (err, existingUser) => {
      if (err) { return next(err); }
      if (existingUser) {
        res.status(422).send(Formatter('Email is in use', true));
      } else {
        const user = new UserModel({ email, password, fullName });

        user.save((err2 , userData) => {
          if (err2) {
            res.status(200).send(Formatter(err2, true));
          } else {
            res.status(200).send(Formatter({ email : email, token: generateToken(userData.id, config.secret) }));
          }
        });
      }
    });
}
