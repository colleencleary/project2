const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  // firstname: {type: String, required: [true, 'field needs to be filled']},
  // lastname: {type: String, required: [true, 'field needs to be filled']},
  // email: {type: String, required: [true, 'field needs to be filled']},
  // city: {type: String, required: [true, 'field needs to be filled']},
  // state: {type: String, required: [true, 'field needs to be filled']},
  // status: {type: String, required: [true, 'field needs to be filled']},
  // institution: {type: String, required: [true, 'field needs to be filled']},
  // description: {type: String, required: [true, 'field needs to be filled']},
  // website: {type: String, required: [true, 'field needs to be filled']},
  // how: {type: String, required: [true, 'field needs to be filled']},
  // username: {type: String, required: [true, 'field needs to be filled']},
  // password: {type: String, required: [true, 'field needs to be filled']}

  firstname: String,
  lastname: String,
  email: String,
  city: String,
  state: String,
  status: String,
  institution: String,
  description: String,
  website: String,
  how: String,
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
