var express = require('express');
var notFound = express.Router();

notFound.get('/', function(req , res , next){
    return res.status(404).send({error : true , message:"End Point Doesn't Exist"});
});

module.exports = notFound;
