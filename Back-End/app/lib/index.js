var mongoose = require('mongoose');
var path = require('path');
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

exports.convertToObjectId = function(strId){
    return mongoose.Types.ObjectId(strId);
}

exports.generateToken = function (userId, tokenSecret) {
    const expires = moment().add(1, 'days').valueOf();

    return jwt.encode({
      iss: userId,
      exp: expires
    }, tokenSecret);
};

exports.queryCheck = function(clientInput , requiredParams){
    console.log(clientInput, 'cleint Input');
    console.log(_.every(requiredParams, item => typeof clientInput[item] !== 'undefined'), 'condition');
    return _.every(requiredParams, item => typeof clientInput[item] !== 'undefined');
}

exports.defaultGitPath = (repoName) => {
    return path.resolve(`D://git/Visions/${repoName}`);
}
