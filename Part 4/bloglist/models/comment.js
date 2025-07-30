const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'comment cannot be empty'],
    minlength: [5, 'comment must be at least 5 characters long'],
    maxlength: [500, 'comment cannot be more than 500 characters']
  },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = commentSchema