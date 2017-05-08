var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('cov-feedback', new Schema({
  message : {type: String , required : true},
  creator : {type : Schema.Types.ObjectId , required: true },
}, {timestamps: true}).plugin(require('mongoose-paginate')));
