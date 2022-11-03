import Part from "./Part"
import Total from "./Total"
const Content = (props) => {
    return (
      <>
        <Part part={props.parts[0]}></Part>
        <Part part={props.parts[1]}></Part>
        <Part part={props.parts[2]}></Part>
        <Total parts={props.parts}></Total>
      </>
    )
  }

export default Content