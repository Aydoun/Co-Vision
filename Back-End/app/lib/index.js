
exports.Formatter = function(msg , err = false){
    return {
        data : msg,
        status : !err
    }
}

exports.nowDate = function(){
    return  Math.round(new Date().getTime()/1000);
}
