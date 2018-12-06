const mongoose = require('mongoose')
const { Schema } = mongoose
const Author = require('../author/model')

const bookSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  authorId: {type: String, required: true}
})

module.exports = mongoose.model('Book', bookSchema)
