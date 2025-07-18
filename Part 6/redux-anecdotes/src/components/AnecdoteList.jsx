import { useSelector, useDispatch } from "react-redux"
import { increaseVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.indexOf(filter) > -1)
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(increaseVote(id))
    const displayAnec =  anecdotes.find(a => a.id === id)
    dispatch(setNotification(`you voted '${displayAnec.content}'`, 5))
  }

  return (
    <div>
      {[...anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
    )}
    </div>
  )
}


export default AnecdoteList