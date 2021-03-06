import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Name from './components/Name'
import personService from './services/persons'
import './App.css'

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

const Persons = ({personsToShow, handleDelete}) =>
  personsToShow.map(person => <div><Name key={person.id} person={person} /><button onClick={() => {handleDelete(person)}}>poista</button></div>)

const Notification = ({message, className}) => {
  console.log({className})
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
  //} else if (successMessage !== null) {
  //  return (
  //    <div className="success">
  //      {successMessage}
  //    </div>
  //  )
  //}
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [className, setClassName] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])
  console.log('render', persons.length, 'persons')


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString()
    }

    const oldPersonArray = persons.filter(e => e.name === nameObject.name)
    if (oldPersonArray.length > 0) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const oldPerson = oldPersonArray[0]
        personService
          .update(oldPerson.id, nameObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => oldPerson.id === person.id ? 
                { ...returnedPerson, id: person.id }
                : person ))
              setNewName('')
              setNewNumber('')
              setErrorMessage(
                `muutettiin henkilön '${newName}' numero onnistuneesti`
              )
              setClassName ("success")
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `henkilö '${newName}' on jo poistettu palvelimelta`
            )
            setClassName ("error")
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(nameObject)
          .then(newName => {
            setPersons(persons.concat(newName))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `lisättiin henkilö '${newName.name}' onnistuneesti`
            )
            setClassName ("success")
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        })
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

  const handleDelete = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService.del(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setErrorMessage(
          `poistettiin henkilö '${person.name}' onnistuneesti`
        )
        setClassName ("success")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={errorMessage} className={className} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h2>lisää uusi</h2>
      <PersonForm addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      
      <h2>Numerot</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App