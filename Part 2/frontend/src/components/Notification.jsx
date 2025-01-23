
// eslint-disable-next-line react/prop-types
const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={messageType}>
            {message}
        </div>
    )

}


export default Notification