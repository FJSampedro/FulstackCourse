import Header from "./Header"
import Content from "./Content"
const Course = (props) => {
    const {id , name, parts } = props.course;
    return (
        <div>
        <Header course={name}></Header>
        <Content id={id} parts={parts}></Content>
        </div>
    )
  }

export default Course 