const ObjectId = require('mongoose').Types.ObjectId;
const path = require('path');
const uuidv1 = require('uuid/v1');
const jwt = require('jwt-simple');
const moment = require('moment');
var _ = require('lodash');

exports.Formatter = function(msg , err = false){
    return {
        response : msg,
        status : !err
    }
}

exports.nowDate = function(){
    return  Math.round(new Date().getTime()/1000);
}

exports.picking = function(data , pickParams){
    return _.pick(data, pickParams);
}

exports.convertToObjectId = strId => ObjectId(strId);

exports.isValidObjectId = (id) =>  ObjectId.isValid(id);

exports.generateToken = function (userId, tokenSecret) {
    const expires = moment().add(1, 'days').valueOf();
    return jwt.encode({
      iss: userId,
      exp: expires
    }, tokenSecret);
};

exports.queryCheck = function(clientInput , requiredParams){
    return _.every(requiredParams, item => typeof clientInput[item] !== 'undefined');
}

exports.defaultGitPath = (repoName) => {
    return path.resolve(`C://git/Visions/${repoName}`);
}

exports.defaultUploadPath = () => {
    return path.resolve(`C://fileUpload/`);
}
