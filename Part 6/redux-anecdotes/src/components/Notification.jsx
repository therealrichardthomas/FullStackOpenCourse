import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: notification ? 'solid' : 'none',
    padding: 10,
    borderWidth: notification ? 1 : 0,
    marginBottom: 10
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification