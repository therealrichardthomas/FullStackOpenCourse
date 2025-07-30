import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  message: null,
  type: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const {message, type} = action.payload
      state.message = message
      state.type = type
    },
    clearNotification(state, action) {
      state.message = null
      state.type = null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type) => {
  return async dispatch => {
    dispatch(setNotification({message, type}))
    setTimeout(() => {
      dispatch(clearNotification(initialState))
    }, 5000)
  }
}

export default notificationSlice.reducer