import Note from './components/Note'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'

import noteService from './services/notes'
import loginService from './services/login'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState()
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('Login Correct')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(user.token);
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const hook = () => {
    console.log('effect')
    // axios
    //   .get('http://localhost:3001/notes') // Sustituimos por servicio dentro de ./services/notes.js
    noteService
    .getAll()
      .then(initialNotes  => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
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
    // axios
    // .post('http://localhost:3001/notes', noteObject) // Sustituimos por servicio dentro de ./services/notes.js
    noteService
    .create(noteObject)
    .then(returnedNote  => {
      setNotes(notes.concat(returnedNote ))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    // axios
    // .put(url, changedNote)// Sustituimos por servicio dentro de ./services/notes.js
    noteService
    .update(id,changedNote)
    .then(returnedNote  => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote ))
    })
    .catch(error=>{                                                       //Captura el error al intentar resolver la promesa
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} isError={isError}/>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
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
      <Footer />
    </div>
  )
}


export default App