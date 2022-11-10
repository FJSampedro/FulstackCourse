import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: "040-1234567"},
    { name: 'Arto Panceta' , number: "040-1234567"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (persons.map(person=>person.name).includes(newName)===true){
      alert(`${newName} is already added to the phonebook`)
    }
    else{
      setPersons(persons.concat({"name":newName,"number":newNumber}))
      setNewName('')
    }
  }

  const handleNameChange = (event) =>{
    console.log(event)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event)
    setNewNumber(event.target.value)
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
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      { <ul>
        {persons.map(person =>
          <Name key={person.name} name={`${person.name} - ${person.number}`}/>
        )}
      </ul> }
    </div>
  )
}

export default App
