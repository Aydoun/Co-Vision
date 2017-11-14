const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs') ;

const Visions = new Schema({
	visionId: Schema.Types.ObjectId,
	role: {type : String , enum: ['Owner', 'Admin', 'Common'] , default : 'Common'},
	status: {type : String , enul:['Active' , 'Inactive'] , default : 'Active'}
} , {timestamps: true});

const userSchema = new Schema({
	fullName: {type: String , required: true , unique : true},
  nickName: {type: String},
  addresses: {type : Array},
  contactInfo : {type:Array},
  phone: {type : String},
  privacy: {type:Array},
  email: {type : String , required: true},
  avatar: {type : String , default : ''},
	visions: [Visions],
  lastLocation: { any: Object , default : {
			lg : 0,
			alt : 0
	}},
  lastLogin: {type : Date , default: Date.now },
  status: {type : String , enum: ['Active', 'Inactive', 'Banned'] , default : 'Active'},
  password: {type : String , required: true},
  salt: {type : String}
} , {timestamps: true})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('cov-user', userSchema);
