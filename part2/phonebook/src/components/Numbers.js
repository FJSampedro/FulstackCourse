import Person from "./Person"
const Numbers=({personsList})=>{
    return(
        <div>
        { <ul>
          {personsList.map(person =>
            <Person key={person.name} person={person}/>
          )}
        </ul> }
        </div>
    )
}
export default Numbers