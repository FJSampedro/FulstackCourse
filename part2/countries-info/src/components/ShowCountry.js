import ShowLanguageList from "./ShowLanguageList"
const ShowCountry = ({country})=>{
    console.log(country)
    return(
        <div>
            <h1>{country.name.common}</h1>
            <div>
                <div> Capital {country.capital} </div>
                <div> Area {country.area}</div>
            </div>
            <div>
                <h3>Languages:</h3>
                <ShowLanguageList languages={country.languages}/>
            </div>
            <div>
                <img src={country.flags.svg} width="150" height="100" ></img>
            </div>
        </div>
    )
}
export default ShowCountry