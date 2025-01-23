import { useState, useEffect } from 'react'
import personService from './services/persons'

import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
      personService
        .getAll()
        .then(requestedPerson => {
          setPersons(requestedPerson)
        })
  }, [])

  const updatePerson = (person) => {
    const ok = window.confirm(`${newName} is already added to phonebook, replace the number?`)
    if (ok) {
      
      personService.update(person.id, {...person, number: newNumber})
        .then((updatedPerson) => {
          setPersons(persons.map(p => p.id !== person.id ? p :updatedPerson ))
          setMessage(`Updated ${updatedPerson.name}'s number`)
          setMessageType('success')
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(() => {
          setMessage(`Could not update ${person.name}'s number`)
          setMessageType('error')
          setTimeout(() => setMessage(null), 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })

      setNewName('')
      setNewNumber('')
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)

    if (person) {
      updatePerson(person)
      return
    }

    personService.create({ name: newName, number: newNumber })
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))

        setMessage(`Added '${createdPerson.name}' to the phonebook`)
        setMessageType('success')
        setTimeout(() => setMessage(null), 5000)

        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setMessage(error.response.data.error)
        setMessage('error')
      })
  }

  const deletion = (id) => {
    const deleted = persons.filter(person => person.id === id)
    if (window.confirm(`Delete ${deleted[0].name}`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Successfully deleted '${deleted[0].name}' from the phonebook`)
          setMessageType('success')
        })
        .catch(() => {
          setMessage('This person has already been deleted from the server')
          setMessageType('error')
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const numbersToShow = persons.filter(person => (
    newFilter.length === 0 || person.name.toLowerCase().indexOf(newFilter.toLowerCase()) > -1
  ));

  return (
    <div> 
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType}/>
      <Filter value={newFilter} onChange={handleNewFilter} /> 

      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} name={newName} onChangeName={handleNewName} number={newNumber} onChangeNumber={handleNewNumber} btnText="add"/>

      <h2>Numbers</h2>
      {numbersToShow.map(person => (
        <div key={person.id}>
          <Person key={person.id} name={person.name} number={person.number} deletion={() => deletion(person.id)}/>
        </div>
      ))}
    </div>
  )
}

export default App