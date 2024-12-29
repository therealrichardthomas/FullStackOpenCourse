import axios from 'axios'
import {useState, useEffect} from 'react'

import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {

  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  } 

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <Filter value={newFilter} onChange={handleNewFilter} />
      {
        countriesToShow.length <= 10 ? (
          countriesToShow.length > 0 ? (
            countriesToShow.map(country => (
              <Country key={country.name.common} country={country} />
            ))
          ) : ( 
          <p>No countries found</p>
          )
        ) : (
          <p>Too many matches, specify another filter</p>
        )
      }
      
    </div>
  )
}

export default App