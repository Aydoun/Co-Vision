var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('cov-contributor', new Schema({
	fullName: {type: String , required: true},
  nickName: {type: String},
  addresses : {type : Array},
  contactInfo : {type:Array},
  phone : {type : String},
  privacy : {type:Array},
  email : {type : String , required: true},
  avatar : {type : String},
  lastLocation : { any: Object , default : {
			lg : 0,
			alt : 0
	}},
  lastLogin : {type : Date , default: Date.now },
  registerIn : {type : Date , default: Date.now },
  status : {type : String , enum: ['Active', 'Inactive', 'Banned'] , default : 'Active'},
  password : {type : String , required: true},
  salt : {type : String}
} , {timestamps: true}));
