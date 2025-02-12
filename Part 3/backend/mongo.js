
require('dotenv').config()
const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument') // prompts the user if password is not passed as a parameter
//   process.exit(1)
// }

// password should be the password for the user fullstack
// const password = process.argv[2] // takes in a parameter on the command line

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

// creating a template for our note object
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// creates a model for our Note, a constructor function
const Note = mongoose.model('Note', noteSchema) // the first parameter becomes a collection by turning into plural lowercase (notes)

// using the model to assign the note's fields
const note = new Note({
  content: 'HTML is easy',
  important: true,
})

// result shows the collection in an array of each object
// find has a parameter that can filter the print of the notes
// Note.find({ important: true }).then(result => {

//   // go through the collection and print each note as its own object in the console
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// saving the note to the collection
note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})