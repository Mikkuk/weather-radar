import { cityCoordinates } from '../data/cities'

const baseUrl = 'https://api.openweathermap.org/data/2.5/'
// eslint-disable-next-line no-undef
const apiKey = process.env.REACT_APP_WEATHER_API_KEY

export const fetchWeatherData = async () => {
  // Fetch current weather and weather forecast data for all cities. Store and format data in the same datastructure.
  try {
    const data = await Promise.all(
      Object.values(cityCoordinates).map(async (city) => {
        const res = await fetch(
          `${baseUrl}weather?lat=${city.latitude}&lon=${city.longitude}&appid=${apiKey}&units=metric`
        )
        const weatherData = await res.json()
        const forecastRes = await fetch(
          `${baseUrl}forecast?lat=${city.latitude}&lon=${city.longitude}&cnt=5&appid=${apiKey}&units=metric`
        )
        const forecastData = await forecastRes.json()
        return {
          name: weatherData.name,
          country: weatherData.sys.country,
          dt: weatherData.dt,
          wind: {
            speed: weatherData.wind.speed,
          },
          weather: {
            main: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
          },
          main: {
            temp: weatherData.main.temp,
            humidity: weatherData.main.humidity,
          },
          forecast: forecastData,
        }
      })
    )
    return data
  } catch (err) {
    console.log(err)
  }
}

export default fetchWeatherData
