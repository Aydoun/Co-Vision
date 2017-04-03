
exports.Formatter = function(msg , err = false){
    return {
        data : msg,
        error : err
    }
}

exports.nowDate = function(){
    return  Math.round(new Date().getTime()/1000);
}
