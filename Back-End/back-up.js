var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var Visions = new Schema({
	visionId : Schema.Types.ObjectId,
	role : {type : String , enum: ['Owner', 'Admin', 'Common'] , default : 'Common'},
	status : {type : String , enul:['Active' , 'Inactive'] , default : 'Active'}
} , {timestamps: true});

const ContributorSchema = new Schema({
	fullName: {type: String , required: true , unique : true},
  nickName: {type: String},
  addresses : {type : Array},
  contactInfo : {type:Array},
  phone : {type : String},
  privacy : {type:Array},
  email : {type : String , required: true, unique : true},
  avatar : {type : String , default : ''},
	visions: [Visions],
  lastLocation : { any: Object , default : {
			lg : 0,
			alt : 0
	}},
	role: { type: Number, default: 0 },
  lastLogin : {type : Date , default: Date.now },
  status : {type : String , enum: ['Active', 'Inactive', 'Banned'] , default : 'Active'},
  password : {type : String , required: true},
}, {timestamps: true}).plugin(require('mongoose-paginate'));

ContributorSchema.pre('save', (next) => {
  var user = this;
	console.log(user , 'preeeeeee');
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) { return next(err2); }
      user.password = hash;
			console.log(hash , 'hash');
      next();
    });
  });
});

ContributorSchema.methods.comparePassword = (candidatePassword, databasePassword, callback) => {
  bcrypt.compare(candidatePassword, databasePassword, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};


module.exports = mongoose.model('cov-contributor', ContributorSchema);
