var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Paths = new Schema({
	title : {type: String , required: true},
  description : {type: String},
  creator : {type : Schema.Types.ObjectId},
	privacy : {type:Array},
	avatar : {type : String},
	status : {type : String , enum: ['Open', 'Cutted' , 'Closed'] , default : 'Open'}
} , {timestamps: true});

var Vision = new Schema({
	title : {type: String , required: true},
  description : {type: String , required : true},
  creator : {type : Schema.Types.ObjectId , required: true },
	paths : [Paths],
  privacy : {type:Array},
  avatar : {type : String},
  status : {type : String , enum: ['Active', 'Inactive'] , default : 'Active'},
}, {timestamps: true}).plugin(require('mongoose-paginate'));

module.exports = mongoose.model('cov-vision', Vision);
