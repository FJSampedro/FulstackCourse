import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")
  const [persons2Show, setPersons2Show] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (persons.map(person => person.name).includes(newName) === true) {
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      const newPerson = { "name": newName, "number": newNumber }
      personsService.addPerson(newPerson)
      .then(returnName=>{
        setPersons(persons.concat(returnName))
        setNewName('')
        setNewNumber('')
      }); 
    }
  }

  const handleNameChange = (event) => {
    console.log(event)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event)
    setFilter(event.target.value)
  }

  const filterPersons = () => {
    if (!Boolean(filter)) {
      setPersons2Show(persons)
    }
    else {
      console.log(filter)
      setPersons2Show(persons.filter(person => person.name.includes(filter)))
    }
  }

  useEffect(filterPersons, [filter, persons])

  const personsHook = () =>{ 
    console.log('effect')
    personsService
      .getPersons()
      .then(personsGet => {
        console.log('promise fulfilled')
        setPersons(personsGet)
      })
  }
  useEffect(personsHook,[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} 
                  newName={newName} 
                  newNumber={newNumber} 
                  handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers personsList={persons2Show} />
    </div>
  )
}

export default App
