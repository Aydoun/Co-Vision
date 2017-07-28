var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vision = new Schema({
	title : {type: String , required: true},
  description : {type: String , required : true},
  creator : {type : Schema.Types.ObjectId , required : true },
  privacy : {type:Array},
  avatar : {type : String},
	type : {type : String, enum : ['public' , 'private'] , default : 'public'},
  status : {type : String , enum: ['Active', 'Inactive'] , default : 'Active'},
}, {timestamps: true});

module.exports = mongoose.model('cov-vision', Vision);
