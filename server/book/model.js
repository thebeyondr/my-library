const mongoose = require('mongoose')
const { Schema } = mongoose
const Author = require('../author/model')

const bookSchema = new Schema({
  name: { type: String },
  genre: { type: String },
  author: { type: Schema.Types.ObjectId, ref: Author }
})

module.exports = mongoose.model('Book', bookSchema)
