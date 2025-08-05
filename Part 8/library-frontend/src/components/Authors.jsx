

import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import BirthYearForm from './BirthYearForm'



const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading authors...</div>
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>
  }
  
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && <BirthYearForm />}
    </div>
  )
}

export default Authors
