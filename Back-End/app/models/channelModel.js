var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comments = new Schema({
	contributorId : Schema.Types.ObjectId,
  comment : {type : String},
} , {timestamps: true});

module.exports = mongoose.model('cov-channel', new Schema({
	title: {type: String , required: true , unique : true},
  description: {type: String},
  creator : {type : Schema.Types.ObjectId , required: true },
	visionId : {type : Schema.Types.ObjectId , required: true },
  comments : [Comments],
  status : {type : String , enum: ['Active', 'Closed'] , default : 'Active'},
} , {timestamps: true}));
