var bcrypt = require('bcrypt-nodejs') ;

exports.passwordHash = function(plainPassword , next){
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(null)
    }

    bcrypt.hash(plainPassword, salt, null, (err2, hash) => {
      if (err2) {
        next(null)
      }
      next(hash)
    });
  });
}
