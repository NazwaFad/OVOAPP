const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String
  },
  saldo: {
    type:Number,
    default:0
    },
  pin:{
    type:Number,
  }
});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
