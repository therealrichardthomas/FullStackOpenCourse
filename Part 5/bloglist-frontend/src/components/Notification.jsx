const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const styleType = notification.type === 'error' ? 'error' : 'success'

  return (
    <div className={styleType}>
      {notification.message}
    </div>
  )
}

export default Notification