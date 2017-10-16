var mongoose = require('mongoose');
var mongooseSchema = mongoose.Schema;

var Schema = new mongooseSchema({
  message : {type: String , required : true},
  creator : {type : mongooseSchema.Types.ObjectId , required: true },
}, {timestamps: true});

Schema.static('findByAuthor', function (author) {
  return this.find({ author: author })
    .exec();
});

module.exports = mongoose.model('cov-feedback', Schema);
