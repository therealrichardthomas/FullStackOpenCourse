/* eslint-disable react/prop-types */

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const styleType = notification.type === 'error' ? 'error' : 'success'

  return (
    <div class={styleType}>
      {notification.message}
    </div>
  )
}

export default Notification