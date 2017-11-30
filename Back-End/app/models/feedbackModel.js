var mongoose = require('mongoose');
var mongooseSchema = mongoose.Schema;

var Schema = new mongooseSchema({
  message : {type: String , required : true},
  serviceScore: {type: Number},
  creator : {type : mongooseSchema.Types.ObjectId , required: true },
}, {timestamps: true});

module.exports = mongoose.model('cov_feedback', Schema);
