import Part from "./Part"
import Total from "./Total"
const Content = (props) => {
    return (
      <>{props.parts.map(part=><Part key={part.id} part={part}/>)}
        <Total parts={props.parts}></Total>
      </>
    )
  }

export default Content