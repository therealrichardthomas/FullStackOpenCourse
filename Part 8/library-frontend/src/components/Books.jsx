import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Filter from './Filter'


const Books = (props) => {
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS, {
    variables: { name: author, genre }
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading books...</div>
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>
  }

  const books = result.data ? result.data.allBooks : []

  return (
    <div>
      <h2>books</h2>
      <Filter author={author} genre={genre} setAuthor={setAuthor} setGenre={setGenre} />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
