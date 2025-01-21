const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message);
    })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5, 
    required: true // the content is required and it must be a minimum of 5 characters
  },
  important: Boolean,
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