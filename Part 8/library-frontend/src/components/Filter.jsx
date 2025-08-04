import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Filter = ({ author, genre, setAuthor, setGenre, uniqueGenres }) => {
  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return <div>loading...</div>
  }

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