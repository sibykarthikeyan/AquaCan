const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobileNumber: {
    type: Number
  },
  password: {
    type: String
  }
},{
    collection: 'userManagement'
});

module.exports = mongoose.model('UserSchema', UserSchema);