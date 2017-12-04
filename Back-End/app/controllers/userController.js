const _ = require('lodash');
const visionModel = require('../models/visionModel');
const UserModel = require('../models/userModel');
const notifs = require('../constants/notificationMessages');
const config = require('../config');
const { passwordHash } = require('../lib/crypto');
const { Formatter, generateToken } = require('../lib');

exports.visionList = function(req, res, next) {
    UserModel.findById(req.userId)
    .then(user => {
      return user.visions.map(item => item.visionId);
    })
    .then(userVisionsId => {
      return visionModel.find(
        { status:'Active', "_id": { "$in": userVisionsId },
      })
    })
    .then(visions => {
      return  res.status(200).send(Formatter(visions));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err , true));
    });
};

exports.addVisionToContributor = function(req, res, next) {
    var visionId = req.visionId;
    if (!visionId) return res.status(403).send(Formatter({message:'All Fields Are Required'} , true));;
    UserModel.findById(req.body.creator , function(err , data){
        data.visions.push({
            visionId : visionId
        });
        data.save(function(err , data){
            res.status(200).send(Formatter(req.repoResponse));
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
          res.status(200).send(Formatter('Authentication failed. User not found.', true));
        } else {
          user.comparePassword(req.body.password, (err2, isMatch) => {
            if (err2) {
                res.status(200).send(Formatter('Authentication failed' , true));
            }
            else if (!isMatch) {
                res.status(200).send(Formatter('Authentication failed, Wrong password', true));
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
