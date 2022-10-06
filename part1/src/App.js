
const App = () => {

  console.log('Hello from component')
  const a = 10
  const b = 20
  return (
    <div>
      <Hello name="Mundo" suma={a+b}>
      </Hello>
      <Hello name="Pascualet" suma={a+b}>
      </Hello>
      <Hello name="Eufrasio" suma={a+b}>
      </Hello>
      <p>{a} plus {b} is {a + b}</p>
    </div>
  )
}

const Hello = (props) => {
  const now = new Date()
  return (
    <>
      <p>Hola {props.name}.<br></br> {now.toString()} <br></br> it's time to learn!!!</p>
      <h1>SUMAAMOOOH {props.suma}</h1>
    </>
  )
}

export default App;
