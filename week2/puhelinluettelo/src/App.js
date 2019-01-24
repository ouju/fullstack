import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Name from './components/Name'

const Filter = ({filter, handleFilterChange}) =>
  <p>rajaa näytettäviä: <input value={filter} onChange={handleFilterChange}/></p>

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
        nimi: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        numero: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow}) =>
  personsToShow.map(name => <Name key={name.id} name={name} />)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      id: persons.length + 1
    }
    
    if (persons.some(e => e.name === nameObject.name)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h2>lisää uusi</h2>
      <PersonForm addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      
      <h2>Numerot</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App