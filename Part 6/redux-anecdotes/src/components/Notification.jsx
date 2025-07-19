import { useSelector } from "react-redux"
import { useNotification } from "../NotificationContext"

const Notification = () => {
  const { notification } = useNotification()
  
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