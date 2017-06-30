var visionModel = require('../models/visionModel');
var UserModel = require('../models/userModel');
var notifs = require('../constants/notificationMessages');
var config = require('../config');
var series  = require('async/series');
var {Formatter, queryCheck, picking, generateToken, passwordHash} = require('../lib');
var {passwordHash} = require('../lib/crypto');

exports.visionList = function(req, res, next) {
    if (!req.params.id) res.status(200).send(Formatter('All Fields Required' , true));

    UserModel.findById(req.params.id , function(err , data){
      visionModel.find({}).
      where('_id').
      in(data.visions.filter(item => item.status == 'Active').map((item)=>item.visionId)).
      exec(function(err , data){
          if (err) return res.status(200).send(Formatter(err , true));
          res.status(200).send(Formatter(data));
      });
    });

};

exports.addVisionToCreator = function(req, res, next) {
    var addResults = req.addResults;
    if (!addResults) return res.status(200).send(Formatter('All Fields Are Required' , true));

    UserModel.findById(addResults.creator , function(err , data){
        data.visions.push({
            visionId : addResults._id,
            visionName : addResults.title
        });
        data.save(function(err , data){
            res.status(200).send(Formatter(addResults));
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
                res.status(200).send(Formatter({data : 'Authentication failed'} , true));
            }
            else if (!isMatch) {
                res.status(200).send(Formatter({ data : 'Authentication failed, Wrong password'}, true));
            } else {
                res.status(200).send(Formatter({
                  _id : user._id,
                  email : user.email,
                  fullName : user.fullName,
                  token: generateToken(user._id, config.secret)
                }));
            }
          });
        }
    });
}

exports.Register = function(req, res, next){
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      res.status(200).send(Formatter('all fields are required', true));
    } else {
      UserModel.findOne({ email }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
          res.status(422).send(Formatter('Email is in use', true));
        } else {
          passwordHash(password , (hash) => {
            if (!hash) {
              res.status(200).send(Formatter('error While Generating Hash', true));
            } else {
              const newUser = new UserModel({ email, password : hash, fullName });

              newUser.save((err2 , userData) => {
                if (err2) {
                  res.status(200).send(Formatter(err2, true));
                } else {
                  res.status(200).send(Formatter({
                    email : email,
                    _id : userData._id,
                    fullName : userData.fullName,
                    token: generateToken(userData._id, config.secret)
                  }));
                }
              });
            }
          });
        }
      });
    }
}
