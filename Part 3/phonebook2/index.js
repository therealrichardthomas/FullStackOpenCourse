const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

// creating a custom token to handle POST requests to add the extra information
morgan.token('post-data', (req) => {
    if (req.method === "POST") {
        return JSON.stringify({name: req.body.name, number: req.body.number})
    } else {
        return ""
    }
})

// using the tiny configuration (can't do tiny + blah blah) and extend with the custom token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/', (request, response) => {
    response.json(phonebook)
})

app.get('/api/info/', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${phonebook.length} people.</p> 
        ${Date()}
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phonebook.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(204).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const newPhonebook = phonebook.filter(person => person.id !== id)
    
    phonebook = newPhonebook

    response.json(newPhonebook)
})

const generateId = () => {
    return String(Math.round(Math.random()*(1000000) + phonebook.length))
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    const personDupe = phonebook.find(person => person.name === body.name)

    if (!body.name || !body.number) {
        return response.status(400).json({error: "missing name or number"})
    } 
    else if (personDupe) {
        return response.status(400).json({error: 'name must be unique'})
    }
    
    const person = {
        id: generateId(),
        name: body.name,    
        number: body.number
    }

    phonebook = phonebook.concat(person)

    response.json(person)
})





const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`);