import React, { useState, useEffect } from 'react'
import axios from 'axios'

const cityCoordinates = {
  "Tampere": { latitude: 61.4991, longitude: 23.7871 },
  "Jyväskylä": { latitude: 62.2415, longitude: 25.7209 },
  "Kuopio": { latitude: 62.8924, longitude: 27.677 },
  "Espoo": { latitude: 60.25, longitude: 24.6667 },
}

function App() {
  const [selectedCity, setSelectedCity] = useState('Tampere')
  const [weatherData, setWeatherData] = useState({})
  
  useEffect(() => {
    if (selectedCity) {
      const { latitude, longitude } = cityCoordinates[selectedCity]
      console.log(selectedCity, latitude, longitude);
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

      axios.get(apiUrl).then((response) => {
        setWeatherData(response.data)
        console.log(response.data);
    })
    }

  }, [selectedCity]);


  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
    console.log(selectedCity);
  }

  const cityOptions = Object.keys(cityCoordinates).map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ));

  return (
    <div className="App">
      <div className="container">
        <div className="top">
          <div className="title">
            <h1>Säätutka</h1>
          </div>
        </div>
          <div className="city-select">
            <label htmlFor="dropdown"></label>
            <select
              id="dropdown"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Kaikki kaupungit</option>
              {cityOptions}
            </select>
          </div>
          <div className='current-weather'>
            <div className='dataset1'>
              <div>
                <div className='city-name'>
                  {weatherData.name}
                </div>
                <div className='weather-desc'>
                {weatherData.weather ? <p>{weatherData.weather[0].description}</p> : null}
                </div>
              </div>
                <div className='weather-pic'>
                  {weatherData.weather ? 
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt = "nnew"
                  /> : null}
                </div>
                <div className='temperature'>
                  {weatherData.main ? <p>{weatherData.main.temp}°C</p> : null}
                </div>
            </div>
            <div className='dataset1'>
              <div>
                <p className='date'>date</p>
                <p className='time'>time</p>
              </div>
              <div className='additional-info'>
                <p className='wind'>wind</p>
                <p className='humidity'>humidity</p>
                <p className='precipitation'>precipitation</p>
              </div>
            </div>
          </div>
          <br></br>
          <div className='forecast'>
              <p>time</p>
              <p>waether pic</p>
              <p>temperstur C</p>
              <p>wind</p>
              <p>humidity</p>
              <p>precipitation</p>
          </div>
      </div>
    </div>
  )
}

export default App
