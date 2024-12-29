
const Filter = ({value, onChange}) => {
    return (
        <div>
            find countries <input value={value} onChange={onChange} placeholder="Type a country name"/>
        </div>
    )
}

export default Filter;