import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Filter = ({filter, handleFilterChange}) =>
  <p>find countries: <input value={filter} onChange={handleFilterChange}/></p>

const Country = ({filteredData}) =>
  filteredData.map(country => 
    <div key={country.name}>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      {country.languages.map(lang => 
      <li key={lang.name}>{lang.name}</li>)} 
      <p><img src={country.flag} alt='Flag' width="150" /></p>
    </div>
  )

const Countries = ({filteredData, filter}) => {
  if (filter === '') {
    return ([])
  } else if (filteredData.length > 10) {
    return ('Too many matches, specify another filter')
  } else if (filteredData.length === 1) {
    return (<Country filteredData={filteredData} />)
  } else {
    return (filteredData.map(country => <p key={country.name}>{country.name}</p>))
  }
}

const App = () => {
  const [countries, setCountry] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredData = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filteredData={filteredData} filter={filter}/>
    </div>
  )
}

export default App