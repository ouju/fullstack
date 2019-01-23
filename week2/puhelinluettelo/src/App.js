import React, { useState } from 'react'
import Name from './components/Name'

const App = (props) => {
  const [ persons, setPersons] = useState(props.names) 
  const [ newName, setNewName ] = useState('uusi nimi...')

  const rows = () => persons.map(name => 
    <Name key={name.id} name={name} />)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      content: newName,
      date: new Date().toISOString(),
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>
          nimi: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {rows()}
    </div>
  )
}

export default App