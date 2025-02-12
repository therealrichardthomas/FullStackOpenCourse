/*
  the note.js contains only the Note schema and doesn't handle the MongoDB connection
*/
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true // the content is required and it must be a minimum of 5 characters
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// calling the exports variable and assigning it
module.exports = mongoose.model('Note', noteSchema)