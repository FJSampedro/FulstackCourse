import { useState } from 'react'

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0, allClicks: []
  })

  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }
  //Esto es lo mismo que:
  //const hello = (who) => () => {
  //console.log('hello', who)
  //}
  //Una arrow function que devuelve una arrow function definida en su interior

  const handleLeftClick = () => {
    setClicks({ ...clicks, left: clicks.left + 1, allClicks: clicks.allClicks.concat("L") })
  }
  //No se debe incrementar el estado directamente en react, siempre hay que crear un objeto nuevo. 
  //No se debe usar por ejemplo click.left++ o click.allClicks.push()

  const handleRightClick = () => {
    setClicks({ ...clicks, right: clicks.right + 1, allClicks: clicks.allClicks.concat("R") })
  }

  const Display = props => <div>{props.value}</div>
  //Se puede definir componentes DENTRO de otro componente (en este caso Display dentro de App)
  //Pero NO se debe hacer nunca puesto que react tratara cada actualizacion de este como un componente nuevo 
  // y le imposibilitara optimizarlo.

  return (
    <div>
      <button onClick={hello("almendrico")}>di hola al almendrico en la consola</button>
      <br></br>
      {clicks.left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {clicks.right}
      <br></br>
      <History allClicks={clicks.allClicks} />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

export default App;
