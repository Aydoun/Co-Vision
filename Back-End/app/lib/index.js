var pickBy = require('lodash/pickBy');
var pick = require('lodash/pick');
var each = require('lodash/each');

exports.Formatter = function(msg , err = false){
    return {
        data : msg,
        status : !err
    }
}

exports.ListFilter = function(query , filterParams = ['page' , 'pageSize']){
    var filtered = {};
    each(query , function(item , key){
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
    return pick(data, pickParams);
}
