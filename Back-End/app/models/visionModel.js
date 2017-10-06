var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vision = new Schema({
	title : {type: String, required: true},
  description : {type: String, required : true},
  creator : {type : Schema.Types.ObjectId, required: true},
  privacy : {type:Array, default : []},
  avatar : {type : String},
  status : {type : String , enum: ['Active', 'Inactive'] , default : 'Active'},
}, {timestamps: true});

module.exports = mongoose.model('cov-vision', Vision);
