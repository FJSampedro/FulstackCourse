import Note from './components/Note'

const App = (props) => {
  const { notes } = props

  return (
    //using a unique "key" prop to each list item in the map is needed for improve the performance
    //https://reactjs.org/docs/reconciliation.html#recursing-on-children
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =><Note key={note.id} note={note}/>)}
      </ul>
    </div>
  )
}

export default App
