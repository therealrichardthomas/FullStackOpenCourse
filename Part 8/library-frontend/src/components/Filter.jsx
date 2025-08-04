import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from '../queries'

const Filter = ({ author, genre, setAuthor, setGenre }) => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  const allGenres = books.data.allBooks.flatMap(book => book.genres)
  const uniqueGenres = [...new Set(allGenres)]

  return (
    <div>
      <select value={author} onChange={e => setAuthor(e.target.value)}>
        <option value="">Select an author</option>
        {authors.data.allAuthors.map(author => (
          <option key={author.name} value={author.name}>{author.name}</option>
        ))}
      </select>
      <select value={genre} onChange={e => setGenre(e.target.value)}>
        <option value="">Select a genre</option>
        {uniqueGenres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  )


}


export default Filter