import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'



const Recommendation = (props) => {
  
  const userResult = useQuery(ME, {
    fetchPolicy: 'network-only',
  })

  if (userResult.error) {
    console.error('User query failed:', userResult.error)
    return <div>Please log in to see recommendations</div>
  }

  const favoriteGenre = userResult?.data?.me?.favoriteGenre

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre},
    skip: !favoriteGenre
  })

  if (!props.show) {
    return null
  }

  if (booksResult.loading || userResult.loading) {
    return <div>loading recommendations...</div>
  }

  const recommendedBooks = booksResult?.data?.allBooks || []


  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

      {recommendedBooks.length > 0 ? (
          <table>
            <tbody>
              <tr>
                <th>title</th>
                <th>author</th>
                <th>published</th>
              </tr>
              {recommendedBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : favoriteGenre ? (
          <p>no books found in your favorite genre</p>
        ) : null
      }
    </div>
  )
}



export default Recommendation