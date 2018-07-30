const visionModel = require('../models/visionModel');
const UserModel = require('../models/userModel');
const notifs = require('../constants/notificationMessages');
const omit = require('lodash/omit');
const _ = require('lodash');
const config = require('../config');
const { passwordHash } = require('../lib/crypto');
const { Formatter, generateToken } = require('../lib');

exports.visionList = function(req, res, next) {
    console.log(req.tokenData.iss)
    UserModel.findById(req.tokenData.iss)
    .then(user => {
      if (user !== null) {
        return user.visions.map(item => item.visionId);
      }
      return ;
    })
    .then(userVisionsId => {
      console.log(userVisionsId);
      return visionModel.find(
        { status:'Active', "_id": { "$in": userVisionsId },
      }).sort({updatedAt: 'desc'}).lean()
    })
    .then(visions => {
      return res.status(200).send(
        Formatter(visions.map(vs => {
          const likesCount = vs.likes.length;
          delete vs['likes'];
          vs.likes = likesCount;
          return vs;
        }))
      );
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message , true));
    });
};

exports.addVisionToContributor = function(req, res, next) {
    const { visionId, tokenData, repoResponse } = req;
    if (!visionId) {
      return res.status(403).send(Formatter({message:'All Fields Are Required'} , true));
    } 

    UserModel.findById(tokenData.iss)
    .then(data => {
      data.visions.push({
        visionId : visionId
      });
      return data.save();
    })
    .then(savedVision => {
      return res.status(200).send(Formatter(repoResponse));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err.message, true));
    });
};

exports.saveAvatar = function(req, res, next) {
    const { tokenData, fileUrl } = req;
    const userId = tokenData.iss;

    UserModel.update({_id: userId}, {avatar: fileUrl})
    .then(user => {
      res.status(200).send(Formatter({
        url: fileUrl
      }));
    })
    .catch(err => {
      res.status(403).send(Formatter(err.message, true));
    });

};

exports.getUser = function(req, res, next) {
    const userId = req.tokenData.iss;
    const omitValues = ['password', 'salt', 'privacy'];

    UserModel.findById(userId)
    .lean()
    .then(user => {
      return res.status(200).send(Formatter(omit(user, omitValues)));
    })
    .catch(err => {
      return res.status(403).send(Formatter(err , true));
    })
};

exports.LogIn = function(req, res, next){
    UserModel.findOne({
      email: req.body.email
    }, (err, user) => {
        if (err) {
          throw err;
        }
        if (!user) {
          res.status(403).send(Formatter('Authentication failed. User not found.', true));
        } else {
          user.comparePassword(req.body.password, (err2, isMatch) => {
            if (err2) {
                res.status(403).send(Formatter('Authentication failed' , true));
            }
            else if (!isMatch) {
                res.status(403).send(Formatter('Authentication failed, Wrong password', true));
            } else {
                res.status(200).send(Formatter({
                  _id : user._id,
                  email : user.email,
                  avatar: user.avatar,
                  fullName : user.fullName,
                  token: generateToken(user, config.secret)
                }));
            }
          });
        }
    });
}

exports.Register = function(req, res, next){
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(403).send(Formatter('all fields are required', true));
    } else {
      UserModel.findOne({ email }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
          res.status(422).send(Formatter('Email is in use', true));
        } else {
          passwordHash(password , (hash) => {
            if (!hash) {
              res.status(403).send(Formatter('error While Generating Hash', true));
            } else {
              const newUser = new UserModel({ email, password : hash, fullName });

              newUser.save((err2 , userData) => {
                if (err2) {
                  res.status(403).send(Formatter(err2, true));
                } else {
                  res.status(200).send(Formatter({
                    email : email,
                    _id : userData._id,
                    avatar: userData.avatar,
                    fullName : userData.fullName,
                    token: generateToken(userData, config.secret)
                  }));
                }
              });
            }
          });
        }
      });
    }
}
