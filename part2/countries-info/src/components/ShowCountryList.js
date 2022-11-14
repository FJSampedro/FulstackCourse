const Country = ({country})=>{
    return(
        <li> {country.name.common} </li>
    )
}

const ShowCountryList = ({ countries }) => {
    return (
        <ul>
            {countries.map(country =>
                <Country key={country.name.common} country={country} />
            )}
        </ul>
    )
}
export default ShowCountryList