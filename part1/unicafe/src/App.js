import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll]=useState(0)
  const [score, setScore]=useState(0)


  const handleGood = () => {
    let gud=good+1
    setGood(gud)
    setAll(getAll(gud,bad,neutral))
    setScore(score+1)
  }
  const handleNeutral = () => {
    let neutr=neutral+1
    setNeutral(neutr)
    setAll(getAll(good,bad,neutr))

  }
  const handleBad = () => {
    let bd = bad+1
    setBad(bd)
    setAll(getAll(good,bd,neutral))
    setScore(score-1)
  }
  const getAll = (good, bad, neutral) =>
  {
   return (good+bad+neutral) 
  }

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
      <br></br>
      <a>all: {all}</a>
      <br></br>
      <a>average: {score/all}</a>
      <br></br>
      <a>percent: {good/all}%</a>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App