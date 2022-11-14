const Country = ({country, handler})=>{
    const buttonHandler = () =>{ 
     return( 
        handler(country.name.common)
     ) 
     }
    return(
        <li> {country.name.common} <input type="submit" value="show" onClick={buttonHandler}></input></li>
    )
}

const ShowCountryList = ({ countries, handler }) => {
    return (
        <ul>
            {countries.map(country =>
                <Country key={country.name.common} country={country} handler={handler} />
            )}
        </ul>
    )
}
export default ShowCountryList