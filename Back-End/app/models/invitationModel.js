var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('cov-invitation', new Schema({
	vision : {any: Object },
  people : {any: Object },
  motivation : {type : String },
  status : {type : String , enum: ['Accepted', 'Waiting' , 'Rejected'] , default : 'Waiting'},
}, {timestamps: true}));
