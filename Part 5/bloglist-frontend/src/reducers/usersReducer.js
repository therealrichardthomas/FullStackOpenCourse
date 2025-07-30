import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }, 
    addUser(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { setUsers, addUser } = usersSlice.actions
export const initializeUsers = () => {
  return async dispatch => {
    try {
      const usersList = await usersService.getAll()
      dispatch(setUsers(usersList))
    } catch (e) {
      console.log(e.message)
    }
  }
}
export default usersSlice.reducer