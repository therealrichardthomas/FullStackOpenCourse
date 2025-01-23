require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

// creating a custom token to handle POST requests to add the extra information
morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify({ name: req.body.name, number: req.body.number })
  } else {
    return ''
  }
})

// custom middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(express.json()) // activates json-parser
// using the tiny configuration (can't do tiny + blah blah) and extend with the custom token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
app.use(express.static('dist')) // serving static files
app.use(cors()) // to use cross-origin

// home page
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// whole phonebook retrieval
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// phonebook information
app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people.</p> 
        <p>${Date()}</p>
      `)
    })
})

// individual person retrieval
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end() // if ID follows same format but doesn't exist
      }
    })
    .catch(error => next(error)) // all other errors including malformatted errors
})

// person from phonebook deletion
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// person to phonebook addition
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))

})

// person's number update
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})