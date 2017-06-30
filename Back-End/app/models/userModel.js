var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs') ;

const Schema = mongoose.Schema;

var Visions = new Schema({
	visionId : Schema.Types.ObjectId,
	visionName : {type : String, required: true},
	role : {type : String , enum: ['Owner', 'Admin', 'Common'] , default : 'Common'},
	status : {type : String , enum:['Active' , 'Inactive' , 'Reported'] , default : 'Active'}
} , {timestamps: true});

const userSchema = new Schema({
  fullName: {type: String , required: true },
  email: { type: String, lowercase: true, unique: true, required: true },
  nickName: {type: String},
  addresses : {type : Array},
  contactInfo : {type:Array},
  phone : {type : String},
  privacy : {type:Array},
  password: String,
  avatar : {type : String , default : ''},
	visions: [Visions],
  lastLocation : { any: Object , default : {
			lg : 0,
			alt : 0
	}},
  lastLogin : {type : Date , default: Date.now },
  status : {type : String , enum: ['Active', 'Inactive', 'Banned'] , default : 'Active'},
  role: { type: Number, default: 0 },
  auth: {
    token: String,
    used: Boolean,
    expires: Date,
  },
  resetPassword: {
    token: String,
    used: Boolean,
    expires: Date,
  },
} , {timestamps: true}).plugin(require('mongoose-paginate'));

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('cov-user', userSchema);

//export default mongoose.model('cov-users', userSchema);
