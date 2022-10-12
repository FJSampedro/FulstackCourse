
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello name={"Pascual"} age={347} ></Hello>
      </header>
    </div>
  );
}

const Hello = ({name,age}) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - age
  }

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

export default App;