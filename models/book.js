const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  image: {type: String},
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  locationDesc: {type: String}
});

module.exports = mongoose.model('Book', bookSchema);
