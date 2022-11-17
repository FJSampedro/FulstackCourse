import axios from 'axios'
import {useState, useEffect} from 'react'

const WeatherInfo = ({city})=>{
    const [weather, setWeather] = useState({
        "request": {
            "type": "City",
            "query": "London, United Kingdom",
            "language": "en",
            "unit": "m"
        },
        "location": {
            "name": "London",
            "country": "United Kingdom",
            "region": "City of London, Greater London",
            "lat": "51.517",
            "lon": "-0.106",
            "timezone_id": "Europe\/London",
            "localtime": "2022-11-17 08:28",
            "localtime_epoch": 1668673680,
            "utc_offset": "0.0"
        },
        "current": {
            "observation_time": "08:28 AM",
            "temperature": 9,
            "weather_code": 296,
            "weather_icons": [
                "https:\/\/cdn.worldweatheronline.com\/images\/wsymbols01_png_64\/wsymbol_0017_cloudy_with_light_rain.png"
            ],
            "weather_descriptions": [
                "Light Rain"
            ],
            "wind_speed": 31,
            "wind_degree": 250,
            "wind_dir": "WSW",
            "pressure": 982,
            "precip": 0.1,
            "humidity": 93,
            "cloudcover": 75,
            "feelslike": 5,
            "uv_index": 2,
            "visibility": 10,
            "is_day": "yes"
        }
    })
    const weatherHook = () =>{ 
        const access_key= process.env.REACT_APP_API_KEY
        axios
          .get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${city}`)
          .then(response => {
            console.log(response.data);
            setWeather(response.data);
        })
      }
    useEffect(weatherHook,[])

    return(
    <>
    <h3>
        Weather in {city}
    </h3>
    <div>
        temperature: {weather.current.temperature} Celsius
    </div>
    <div>
        <img src={weather.current.weather_icons}></img>
    </div>
    <div>
        wind: {weather.current.wind_speed} direction: {weather.current.wind_dir}
    </div>
    </>
    )
}
export default WeatherInfo