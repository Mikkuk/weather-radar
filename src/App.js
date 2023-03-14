import React, { useState, useEffect } from 'react'
import axios from 'axios'

const cityCoordinates = {
  Tampere: { latitude: 61.4991, longitude: 23.7871 },
  Jyvaskyla: { latitude: 62.2415, longitude: 25.7209 },
  Kuopio: { latitude: 62.8924, longitude: 27.677 },
  Espoo: { latitude: 60.25, longitude: 24.6667 },
}

function App() {
  const [selectedCity, setSelectedCity] = useState('')
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY
    const urls = Object.values(cityCoordinates).map(
      (city) =>
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${apiKey}&units=metric`
    )

    axios
      .all(urls.map((url) => axios.get(url)))
      .then(
        axios.spread((...responses) => {
          const data = responses.map((response) => response.data)
          setWeatherData(data)
          console.log(data);
        })
      )
      .catch((error) => console.log(error))

    // if (selectedCity) {
    //   setWeatherData([])
    //   const { latitude, longitude } = cityCoordinates[selectedCity]
    //   console.log(selectedCity, latitude, longitude)
    //   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

    //   axios.get(apiUrl).then((response) => {
    //     setWeatherData(response.data)
    //     console.log(response.data, weatherData)
    //   })
    // }
  }, [selectedCity])

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
    console.log(selectedCity)
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

  const formatDate = (dt) => {
    const dateObj = new Date(dt * 1000)
    const date = dateObj.getDate()
    const suffix = getSuffix(date)
    const month = dateObj.toLocaleString('en-US', { month: 'short' })
    return `${month} ${date}${suffix}`
  }

  const formatTime = (dt) => {
    const dateObj = new Date(dt * 1000)
    let hours = dateObj.getHours()
    let minutes = dateObj.getMinutes()
    if (hours < 10) {
      hours = "0" + hours
    }
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    return `${hours}:${minutes}`
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
        <div className="weather-component">
          {weatherData.map((data, index) => {
            if (!selectedCity || data.name === selectedCity) {
              return (
                <div key={index}>
                  <div>
                    <div className="section current-weather">
                      <div className="dataset">
                        <div>
                          <div className="city-name">{data.name}</div>
                          <div className="weather-desc">
                            {data.weather ? (
                              <p>{data.weather[0].description}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="weather-info">
                          {data.weather ? (
                            <img
                              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                              alt="weather-pic"
                            />
                          ) : null}
                          <div className="temperature">
                            {data.main ? (
                              <p>{data.main.temp.toFixed()}°C</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="dataset">
                        <div>
                          <p className="date">{formatDate(data.dt)}</p>
                          <p className="time">{formatTime(data.dt)}</p>
                        </div>
                        <div className="additional-info">
                          <div className="wind">
                            {data.wind ? (
                              <p>Wind: {data.wind.speed} m/s</p>
                            ) : null}
                          </div>
                          <div className="humidity">
                            {data.main ? (
                              <p>Humidity: {data.main.humidity} %</p>
                            ) : null}
                          </div>
                          <div className="precipitation">
                            Precipitation (3h):{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}

export default App
