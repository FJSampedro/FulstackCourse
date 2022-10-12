import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 10),
    1000
  )
  console.log("rendering...", counter)
  return (
    <div>{counter}</div>
  )
}

export default App