const mongoose = require('mongoose');
const Posts = require('./posts.js');
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true },
  city: String,
  state: String,
  status: String,
  institution: String,
  description: String,
  website: String,
  how: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  posts: [Posts.schema]

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
