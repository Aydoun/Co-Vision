var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('cov-invitation', new Schema({
	vision: { type : Schema.Types.ObjectId, required : true },
  requested: {type: Schema.Types.ObjectId },
  requester: {type: Schema.Types.ObjectId },
  motivation: { type : String, required: true },
	role : {type : String , enum: ['Owner', 'Admin', 'Common'] , default : 'Common'},
  status: {type : String , enum: ['Accepted', 'Waiting' , 'Rejected'] , default : 'Waiting'},
}, {timestamps: true}));
