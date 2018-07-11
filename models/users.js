const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  status: { type: String, required: true },
  institution: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  how: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }

  // firstname: String,
  // lastname: String,
  // email: String,
  // city: String,
  // state: String,
  // status: String,
  // institution: String,
  // description: String,
  // website: String,
  // how: String,
  // username: String,
  // password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
