var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('cov-contributor', new Schema({
	fullName: {type: String , required: true},
  nickName: {type: String},
  addresses : {type : Array},
  contactInfo : {type:Array},
  privacy : {type:Array},
  email : {type : String , required: true},
  avatar : {type : String},
  lastLogin : {type : Date},
  registerIn : {type : Date},
  status : {type : String , enum: ['Active', 'Inactive', 'Banned'] , default : 'Active'},
  password {type : String , required: true},
  salt : {type : String}
}));
