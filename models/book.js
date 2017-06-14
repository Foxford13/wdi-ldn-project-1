const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});


commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const locationSchema = new mongoose.Schema({
  lat: { Number},
  lng: { Number}
},{
  timestamps: true
});




const bookSchema = new mongoose.Schema({
  image: {type: String},
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  locationDesc: {type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  locations: [locationSchema],
  comments: [ commentSchema ],
  googleBookId: { type: String}

});





bookSchema.methods.belongsTo = function belongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Book', bookSchema);
