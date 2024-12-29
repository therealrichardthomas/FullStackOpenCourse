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

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    const checkPerson = persons.find(person => person.name === personObject.name)
    const changedPerson = {...checkPerson, number: personObject.number}

    if (checkPerson) {
      if(window.confirm((`${personObject.name} is already added to the phonebook. Would you like to replace the old number with the new number?`))) {
        personService
          .update(checkPerson.id, changedPerson)
          .then(requestedPerson => {
            setPersons(persons.map(person => person.name === personObject.name ? requestedPerson : person))
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${personObject.name}'s number`)
            setMessageType('success')
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(() => {
            setMessage(`Could not update ${personObject.name}'s number`)
            setMessageType('error')
            setTimeout(() => setMessage(null), 5000)
          })
        }
      } else {
        personService
        .create(personObject)
        .then(requestedPerson => {
          setPersons(persons.concat(requestedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added '${personObject.name}' to the phonebook`)
          setMessageType('success')
          setTimeout(() => setMessage(null), 5000)
        })
    }
  }

  const deletion = (id) => {
    const deleted = persons.filter(person => person.id === id)
    if (window.confirm(`Delete ${deleted[0].name}`)) {
      personService
        .deletePerson(id)
        .then(response => {
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