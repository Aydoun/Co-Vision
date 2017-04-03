var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('notice', new Schema({
	companyId: {type: String},
	title: {type: String},
	description: {type: String},
  status: {type : Number},
	updated_at: {type: Date}
}));
