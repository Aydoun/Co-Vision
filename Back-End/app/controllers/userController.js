/**
 * Co-Vision
 * @file User Controller
 * @author Mohamed Amine Aydoun <aydoun@qq.com>
 * @version 0.1
 */
const visionModel = require('../models/visionModel');
const UserModel = require('../models/userModel');
const notifs = require('../constants/notificationMessages');
const config = require('../config');
const series  = require('async/series');
const { Formatter, queryCheck, picking, generateToken, passwordHash } = require('../lib');
var { passwordHash } = require('../lib/crypto');
var {
    returnTreeSummary
} = require('./gitController');


/**
* List Visions For a User
* @param {Number} id - User id
* @return {Object} returns The Vision linked to the user
*/
exports.visionList = function(req, res, next) {
    if (!req.params.id) res.status(200).send(Formatter('All Fields Required' , true));

    UserModel.findById(req.params.id , function(err , data){
      if (data) {
        visionModel.find({}).
        where('_id').
        in(data.visions.filter(item => item.status == 'Active').map((item)=>item.visionId)).
        exec(function(err , data){
            if (err) return res.status(200).send(Formatter(err , true));
            res.status(200).send(Formatter(data));
        });
      } else {
        res.status(200).send(Formatter({}));
      }

    });
};

/**
* List Visions Summary For a User
* @param {Number} id - User id
* @return {Object} returns The Vision Summary
*/
exports.visionListSummary = function(req, res, next) {
    const { id } = req.params;
    var seriesobj = {};
    UserModel.findById(id , function(err , user){
      if (user) {
        user.visions.map(function(vision , index){
            var visionId = vision._id;
            seriesobj[visionId] = function(callback) {
                returnTreeSummary({repoName : vision.visionName} , function(result){
                    callback(null , result);
                });
            }
        });
        series(
          seriesobj ,
          function(err, results) {
            //  Final Callback
            res.status(200).send(Formatter(results));
          }
        );
      } else {
        res.status(200).send(Formatter(user , true));
      }
    });
};

/**
* List Visions Summary For a User
* @param {Number} id - User id
* @return {Object} returns The Vision Summary
*/
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

/**
* List Visions Summary For a User
* @param {String} email - User email
* @param {String} password - User password
* @return {Object} returns User Login Data
*/

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


/**
* List Visions Summary For a User
* @param {String} email - User email
* @param {String} password - User password
* @param {String} fullName - User name
* @return {Object} returns User Register Data
*/
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
