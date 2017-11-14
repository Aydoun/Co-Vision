const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Messages = new Schema({
	messageId : Schema.Types.ObjectId,
  content : {type : String, requires: true},
  action: {type : String , enum:['sent' , 'received'] , default : 'sent'},
	status : {type : String , enum:['read' , 'unread'] , default : 'unread'}
} , {timestamps: true});

module.exports = mongoose.model('cov-conversation', new Schema({
  creator : {type : Schema.Types.ObjectId, required: true},
  receiver: {type : Schema.Types.ObjectId, required: true},
  messages: [Messages],
} , {timestamps: true}));
