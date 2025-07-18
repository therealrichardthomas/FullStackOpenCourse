import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// const generateId = () => Number(Math.random() * 1000000).toFixed(0)

const noteSlice = createSlice({
  name: 'notes', 
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const ogNote = state.find(note => note.id === id)
      const changedNote = {
        ...ogNote,
        important: !ogNote.important
      }
      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) { // adding a single note
      state.push(action.payload)
    },
    setNotes(state, action) { // adding a group of notes (initializing the application)
      return action.payload
    }
  }
})

export const {toggleImportanceOf, appendNote, setNotes } = noteSlice.actions 

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}
export const createNote = (content) => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer;