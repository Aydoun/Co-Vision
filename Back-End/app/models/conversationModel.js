const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Messages = new Schema({
	messageId : Schema.Types.ObjectId,
  content : {type : String, requires: true},
  sender: Schema.Types.ObjectId,
	status : {type : String , enum:['read' , 'unread'] , default : 'unread'}
} , {timestamps: true});

const Conversation = new Schema({
  creator : {type : Schema.Types.ObjectId, required: true},
  receiver: {type : Schema.Types.ObjectId, required: true},
  messages: [Messages],
} , {timestamps: true});

module.exports = mongoose.model('cov_conversation', Conversation);
