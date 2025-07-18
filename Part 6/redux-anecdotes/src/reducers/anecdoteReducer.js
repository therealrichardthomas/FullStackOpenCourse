import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    updateVote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anec => anec.id !== updatedAnecdote.id ? anec : updatedAnecdote)
    },
    appendAnecdote(state, action) { // single anecdote
      state.push(action.payload)
    },
    setAnecdotes(state, action) { // initializing several anecdotes (a.k.a. first loading the application)
      return action.payload
    }
  }
})

export const { updateVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const increaseVote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch(updateVote(updatedAnecdote))
  }
}

export default anecdotesSlice.reducer