
const Person = ({name, number, deletion}) => {
    return(
        <p>
            {name} {number} <button onClick={deletion}>delete</button>
        </p>
    )
}

export default Person