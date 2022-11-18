import Note from './components/Note'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  useEffect(hook, [])
  console.log('render', notes.length, 'notes')


  //Operador condicional: const result = condition ? val1 : val2
  //Filtrado de array: notes.filter(note => note.important === true)
  //Comparacion de valor Y tipo: note.important === true
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // id: notes.length + 1, //No introducimos el id para que sea la BBDD la que lo introduzca automaticamente.
    }
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}


export default App