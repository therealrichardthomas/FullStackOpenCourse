import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const { setNotification } = useNotification()

  const validateAnecdote = (content) => {
    if (content.length < 5) {
      setNotification('too short anecdote, must have length 5 or more', 5)
      return false
    }
    return true
  }

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!validateAnecdote(content)) {
      event.target.anecdote.value = ''
      return
    }
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    setNotification(`you created '${content}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm