
const PersonForm = ({onSubmit, name, number, onChangeName, onChangeNumber, btnText}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={name} onChange={onChangeName} />
            </div>
            <div>
                number: <input value={number} onChange={onChangeNumber} />
            </div>
            <button type="submit">{btnText}</button>
        </form>
    )
}

export default PersonForm