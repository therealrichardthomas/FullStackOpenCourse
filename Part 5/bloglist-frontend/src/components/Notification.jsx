import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification) // need to use this because im using createStore w/ notificationReducer
  if (notification.message === null) {
    return null
  }

  const styleType = (notification.type === 'error' 
    ? 'text-red-500 bg-gray-200'
    : 'text-green-700 bg-gray-200') + 
    ' text-xl border-2 rounded p-5 w-xl mt-2'

  return (
    <div className={styleType}>
      {notification.message}
    </div>
  )
}

export default Notification