import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds *1000)
  }
}



export default notificationSlice.reducer