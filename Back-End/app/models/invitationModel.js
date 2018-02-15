var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('cov_invitation', new Schema({
	vision: { type : Schema.Types.ObjectId, required : true },
  requested: {type: Schema.Types.ObjectId },
  requester: {type: Schema.Types.ObjectId },
  motivation: { type : String},
	userName: {type: String, default: ''},
	visionName: {type: String, default: ''},
	visionAvatar: {type: String, default: ''},
	role : {type : String , enum: ['Owner', 'Admin', 'Common'] , default : 'Common'},
  status: {type : String , enum: ['Accepted', 'Waiting' , 'Rejected'] , default : 'Waiting'},
}, {timestamps: true}));
