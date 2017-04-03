
exports.Formatter = function(msg , err = false){
    return {
        data : msg,
        error : err
    }
}
