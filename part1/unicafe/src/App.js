import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll]=useState(0)
  const [score, setScore]=useState(0)

  const handleGood = () => {
    setGood(good+1)
    setAll(all+1)
    setScore(score+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }
  const handleBad = () => {
    setBad(bad+1)
    setAll(all+1)
    setScore(score-1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {handleGood} text="good"/>
      <Button handleClick = {handleNeutral} text="neutral"/>
      <Button handleClick = {handleBad} text="bad"/>
      <Statistics good={good} bad={bad} neutral={neutral} score={score} all={all} />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics= (props) =>{
  let good=props.good
  let bad=props.bad
  let neutral=props.neutral
  let score=props.score
  let all=props.all
  if (all>0) { 
    return(
      <>
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
      </>
    )
    }
  else{
    return(
      <>
      <h2>statistics</h2>
      <a>No feedback given</a>
      <br></br>
      </>
    )
  }
}

export default App