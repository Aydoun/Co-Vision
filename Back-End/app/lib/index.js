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
    var _returned = true;
    _.each(requiredParams , function(item , key){
          if (!clientInput[item]) {
              _returned = item;
              return ;
          }
    });

    return _returned;
}

exports.defaultGitPath = (title) => {
    return path.resolve(`D://git/Visions/${title}`);
}
