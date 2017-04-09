var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('cov-vision', new Schema({
	title : {type: String , required: true},
  description : {type: String},
  creator : {type : Schema.Types.ObjectId , required: true },
  privacy : {type:Array},
  avatar : {type : String},
  creationDate : {type : Date , default: Date.now },
  lastUpdate : {type : Date },
  status : {type : String , enum: ['Active', 'Inactive'] , default : 'Active'},
}, {timestamps: true}).plugin(require('mongoose-paginate')));
