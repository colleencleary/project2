const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  board: String,
  title: { type: String, required: true},
  author: { type: String, required: true },
  anonymous: Boolean,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  meta: {
		favorites: Number
	}
});

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts
