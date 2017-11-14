const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Likes = new Schema({
  userId: {type : Schema.Types.ObjectId},
} , {timestamps: true});

const Vision = new Schema({
	title : {type: String},
  description : {type: String},
  creator : {type : Schema.Types.ObjectId, required: true},
  privacy : {type:Array, default : []},
  avatar : {type : String},
  likes: [Likes],
	type : {type : String, enum : ['public' , 'private'] , default : 'public'},
  status : {type : String , enum: ['Active', 'Inactive'] , default : 'Active'},
}, {timestamps: true});

Vision.index({ title: 'text', description: 'text'});

module.exports = mongoose.model('cov-vision', Vision);
