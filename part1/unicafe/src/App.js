import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {handleGood} text="good"/>
      <Button handleClick = {handleNeutral} text="neutral"/>
      <Button handleClick = {handleBad} text="bad"/>
      <h2>statistics</h2>
      <a>good: {good}</a>
      <br></br>
      <a>neutral: {neutral}</a>
      <br></br>
      <a>bad: {bad}</a>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App