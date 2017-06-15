const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

  username: { type: String },
  image: { type: String },   ///may caus errors
  email: { type: String },
  password: { type: String },
  instagramId: { type: Number }

});


userSchema.pre('validate', function checkPassword(next) {

  if(!this.password && !this.instagramId) {
    this.invalidate('password', 'required');
  }

  if(this.isModified('password') &&  this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema
.virtual('passwordConfirmation')
.set(function setpasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
});



userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('remove', function removeUserPosts(next) {
  this.model('Post').remove({ createdBy: this.id }, next);
});

module.exports = mongoose.model('User', userSchema);
