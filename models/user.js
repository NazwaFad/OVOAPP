const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required:'please enter your phone number'
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;