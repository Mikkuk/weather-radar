import React, { useState, useEffect } from 'react'
import axios from 'axios'

const cityCoordinates = {
  Tampere: { latitude: 61.4991, longitude: 23.7871 },
  Jyväskylä: { latitude: 62.2415, longitude: 25.7209 },
  Kuopio: { latitude: 62.8924, longitude: 27.677 },
  Espoo: { latitude: 60.25, longitude: 24.6667 },
}

function App() {
  const [selectedCity, setSelectedCity] = useState('')
  const [weatherData, setWeatherData] = useState({})
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    if (selectedCity) {
      const { latitude, longitude } = cityCoordinates[selectedCity]
      console.log(selectedCity, latitude, longitude)
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

      axios.get(apiUrl).then((response) => {
        setWeatherData(response.data)
        console.log(response.data)
      })
    }
  }, [selectedCity])

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
    console.log(selectedCity)
    setDateTime()
  }

  function getSuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th'
    }
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const setDateTime = () => {
    const dateObj = new Date(weatherData.dt * 1000)
    console.log(dateObj, dateObj.getSeconds(), dateObj.getDate())
    const date = dateObj.getDate()
    const suffix = getSuffix(date)
    const month = dateObj.toLocaleString('en-US', { month: 'short' })
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()
    console.log(date, month, hours, minutes)
    setCurrentDate(`${month} ${date}${suffix}`)
    setCurrentTime(`${hours}:${minutes}`)
  }

  const cityOptions = Object.keys(cityCoordinates).map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))

  return (
    <div className="App">
      <div className="top">
        <div className="title">
          <h1>Säätutka</h1>
        </div>
      </div>
      <div className="container">
        <div className="section city-select">
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
        <div className="section current-weather">
          <div className="dataset">
            <div>
              <div className="city-name">{weatherData.name}</div>
              <div className="weather-desc">
                {weatherData.weather ? (
                  <p>{weatherData.weather[0].description}</p>
                ) : null}
              </div>
            </div>
            <div className="weather-info">
              {weatherData.weather ? (
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather-pic"
                />
              ) : null}
              <div className="temperature">
                {weatherData.main ? (
                  <p>{weatherData.main.temp.toFixed()}°C</p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="dataset">
            <div>
              <p className="date">{currentDate}</p>
              <p className="time">{currentTime}</p>
            </div>
            <div className="additional-info">
              <div className="wind">
                {weatherData.wind ? (
                  <p>Wind: {weatherData.wind.speed} m/s</p>
                ) : null}
              </div>
              <div className="humidity">
                {weatherData.main ? (
                  <p>Humidity: {weatherData.main.humidity} %</p>
                ) : null}
              </div>
              <div className="precipitation">Precipitation (3h): </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="forecast">
          <div className="hourly-forecast">
            <div className="time-and-weather">
              <p className="forecast-time">time</p>
              <p className="forecast-pic">waether pic</p>
              <p className="forecast-temperature">temperstur C</p>
            </div>
            <div className="forecast-additional-info">
              <p>wind</p>
              <p>humidity</p>
              <p>precipitation</p>
            </div>
          </div>
          <div className="hourly-forecast">
            <div className="time-and-weather">
              <p className="forecast-time">time</p>
              <p className="forecast-pic">waether pic</p>
              <p className="forecast-temperature">temperstur C</p>
            </div>
            <div className="forecast-additional-info">
              <p>wind</p>
              <p>humidity</p>
              <p>precipitation</p>
            </div>
          </div>
          <div className="hourly-forecast">
            <div className="time-and-weather">
              <p className="forecast-time">time</p>
              <p className="forecast-pic">waether pic</p>
              <p className="forecast-temperature">temperstur C</p>
            </div>
            <div className="forecast-additional-info">
              <p>wind</p>
              <p>humidity</p>
              <p>precipitation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
