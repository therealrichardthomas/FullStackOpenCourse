const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()


const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(async () => {
    const authors = await Author.find({})
    for (const author of authors) {
      const count = await Book.countDocuments({ author: author._id })
      author.bookCount = count
      await author.save()
    }
    console.log('Migration complete!')
    mongoose.connection.close()
  })