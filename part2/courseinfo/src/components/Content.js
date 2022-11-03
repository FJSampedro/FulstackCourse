import Part from "./Part"
const Content = (props) => {
    return (
      <>
        <Part part={props.parts[0]}></Part>
        <Part part={props.parts[1]}></Part>
        <Part part={props.parts[2]}></Part>
      </>
    )
  }

export default Content