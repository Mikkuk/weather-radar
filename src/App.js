import React, { useState, useEffect } from 'react'
import { fetchWeatherData } from './services/weatherService'
import { SelectCity } from './components/SelectCity'
import { Weather } from './components/Weather'

function App() {
  const [selectedCity, setSelectedCity] = useState('')
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData()
      setWeatherData(data)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <div className="top">
        <div className="title">
          <h1>Säätutka</h1>
        </div>
      </div>
      <div className="container">
        <SelectCity setSelectedCity={setSelectedCity} />
        <Weather weatherData={weatherData} selectedCity={selectedCity} />
      </div>
    </div>
  )
}

export default App
