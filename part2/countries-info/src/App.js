import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryInfo from './components/CountryInfo'

function App() {

const [filter, setFilter] = useState("")
const [countries, setCountries] = useState([])
const [countries2Show, setCountries2Show] = useState([])

const handleFilterChange = (event) => {
  console.log(event)
  setFilter(event.target.value)
}

const buttonHandler = (country) =>{ 
  setFilter(country)
 }

const filterCountries = () => {
  if (!Boolean(filter)) {
    setCountries2Show(countries)
  }
  else {
    console.log(countries.filter(country => country.name.common.includes(filter)).map(country=> country.name.common))
    setCountries2Show(countries.filter(country => country.name.common.includes(filter)))
  }
}

useEffect(filterCountries, [filter, countries])

const countriesHook = () =>{ 
  console.log('effect')
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data);
    })
}
useEffect(countriesHook,[])

//weatherHook("London")

  return (
    <div className="App">
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <CountryInfo countries={countries2Show} handler={buttonHandler}/>
    </div>
  );
}

export default App;

