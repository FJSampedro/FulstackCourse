import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Arto Panceta' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    setPersons(persons.concat({"name":newName}))
    setNewName('')
  }
  const handleNameChange = (event) =>{
    console.log(event)
    setNewName(event.target.value)
  }
  const Name=({name})=>{
    return(
      <li>{name}</li>
    )
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      { <ul>
        {persons.map(person =>
          <Name key={person.name} name={person.name}/>
        )}
      </ul> }
    </div>
  )
}

export default App
