import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const BirthYearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (authors.loading) {
    return <div>loading authors...</div>
  }

  console.log(authors.data.allAuthors)

  const submit = (e) => {
    e.preventDefault()

    editAuthor({ variables: { name, setBornTo: Number(born) }})

    setName('')
    setBorn('')
  }


  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select onChange={e => setName(e.target.value)}>
            <option value="">Select an author</option>
            {authors.data.allAuthors.map(author => (
              <option key={author.name} value={author.name}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          born <input value={born} onChange={({target}) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}


export default BirthYearForm