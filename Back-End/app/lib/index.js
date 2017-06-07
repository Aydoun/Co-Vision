var mongoose = require('mongoose');
var _ = require('lodash');

exports.Formatter = function(msg , err = false){
    return {
        data : msg,
        status : !err
    }
}

exports.ListFilter = function(query , filterParams = ['page' , 'pageSize']){
    var filtered = {};
    _.each(query , function(item , key){
        if (filterParams.indexOf(key) < 0) {
            //Non Existant Key - Valid Filter Parameter
            filtered.key = item;
        }
    });

    return filtered;
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
