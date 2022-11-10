import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: "040-1234567"},
    { name: 'Arto Panceta' , number: "040-1234567"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter]=useState("")
  const [persons2Show, setPersons2Show] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (persons.map(person=>person.name).includes(newName)===true){
      alert(`${newName} is already added to the phonebook`)
    }
    else{
      setPersons(persons.concat({"name":newName,"number":newNumber}))
      setNewName('')
      setNewNumber('')
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

  const handleFilterChange = (event) =>{
    console.log(event)
    setFilter(event.target.value)
  }

  const filterPersons = () =>{
    if (!Boolean(filter)){
      setPersons2Show(persons)
    }
    else{
      console.log(filter)
      setPersons2Show(persons.filter(person=>person.name.includes(filter)))
    }
  }

  useEffect(filterPersons,[filter,persons])

  const Name=({name})=>{
    return(
      <li>{name}</li>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange}/> 
      </div>
      <div>
        <h2>add a new</h2>
      </div>
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
        {persons2Show.map(person =>
          <Name key={person.name} name={`${person.name} - ${person.number}`}/>
        )}
      </ul> }
    </div>
  )
}

export default App
