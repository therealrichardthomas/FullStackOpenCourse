import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_PERSON, ALL_PERSONS } from '../queries'


const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  // returns an array, the first element is the function
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }], // calls ALL_PERSONS to update the page with the new mutation
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  const submit = (e) => {
    e.preventDefault()
    createPerson({ variables: {name, phone, street, city }})
    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          phone <input value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div>
          street <input value={street} onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div>
          city <input value={city} onChange={({ target }) => setCity(target.value)} />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )

}


export default PersonForm