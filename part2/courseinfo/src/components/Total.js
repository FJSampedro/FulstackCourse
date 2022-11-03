const Total = (props) => {
    const exercises=props.parts.map((i)=>i.exercises);
    return (
      <p>Number of exercises {exercises.reduce((s,i)=>s+i)}</p>
    )
  }

export default Total 