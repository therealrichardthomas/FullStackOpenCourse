const express = require('express')
const app = express()

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

app.use(express.static('dist')) // serves the production build static files

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const cors = require('cors')
app.use(cors())

app.use(express.json()) // activates the json-parser
app.use(requestLogger)


const unknownEndpoint = (request, response) => {
    response.status(400).send({error: "unknown endpoint"})
}

app.get("/", (request, response) => {
    response.send(`<h1> Hello World!</h1>`)
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(204).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const newNotes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

const generateId = () => {
    // .map() returns an array of the ids of each of the notes and spreads (...) them as an individual element then finds the max of the ids
    const maxId = notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0
    return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false, 
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})

app.put('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const body = request.body

    const note = notes.find(note => note.id === id) 
    const changedNote = {...note, important: body.important}

    notes = notes.map(note => note.id === id ? changedNote : note)

    response.json(changedNote)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
