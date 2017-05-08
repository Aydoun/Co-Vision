var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('cov-contribution', new Schema({
	contribution : {any: Object },
  visionId : {type : Schema.Types.ObjectId , required: true },
  contributorId : {type : Schema.Types.ObjectId , required: true },
  status : {type : String , enum: ['Active', 'InActive'] , default : 'Active'},
}, {timestamps: true}).plugin(require('mongoose-paginate')));
