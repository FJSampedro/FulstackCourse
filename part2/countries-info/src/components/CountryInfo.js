import ShowCountry from "./ShowCountry"
import ShowCountryList from "./ShowCountryList"

const CountryInfo = ({ countries }) => {
    if (countries.length == 0){
        return (
            <div> No country match the query</div>
        )
    } else if (countries.length == 1){
        return (
            <div> 
                <ShowCountry country={countries[0]} />
            </div>
        )
    } else if (countries.length < 10){
        return (
            <div>
                <ShowCountryList countries={countries} />
            </div>
        )
    } else if (countries.length >= 10){
        return (
            <div> Too many matches, {countries.length} matches, specify another filter</div>
        )
    }
}
export default CountryInfo

