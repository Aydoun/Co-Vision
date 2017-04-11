var pickBy = require('lodash/pickBy');


exports.Formatter = function(msg , err = false){
    return {
        data : msg,
        status : !err
    }
}

exports.ListFilter = function(query){
    return pickBy(query , function(o , key){ return key != 'page' && key != 'pageSize'});
}

exports.nowDate = function(){
    return  Math.round(new Date().getTime()/1000);
}
