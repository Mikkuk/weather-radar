export const Weather = ({ weatherData, selectedCity }) => {
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
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    return `${hours}:${minutes}`
  }

  return (
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
                          <p>{data.weather.description}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="weather-info">
                      {data.weather ? (
                        <img
                          src={`https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`}
                          alt="weather-pic"
                        />
                      ) : null}
                      <div className="temperature">
                        {data.main ? <p>{data.main.temp.toFixed()}°C</p> : null}
                      </div>
                    </div>
                  </div>
                  <div className="dataset">
                    <div className="datetime">
                      <p className="date">{formatDate(data.dt)}</p>
                      <p className="time">{formatTime(data.dt)}</p>
                    </div>
                    <div className="additional-info">
                      <div className="wind">
                        {data.wind ? <p>Wind: {data.wind.speed} m/s</p> : null}
                      </div>
                      <div className="humidity">
                        {data.main ? (
                          <p>Humidity: {data.main.humidity} %</p>
                        ) : null}
                      </div>
                      <div className="precipitation">
                        Precipitation (3h):{' '}
                        {data.rain ? data.rain['3h'] : 'Not available'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="forecast">
                {data.forecast.list.map((item) => (
                  <div className="hourly-forecast" key={item.dt}>
                    <div className="time-and-weather">
                      <div className="forecast-time">
                        {item.dt_txt.slice(11, 16)}
                      </div>
                      <div className="forecast-pic">
                        {item.weather ? (
                          <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt="weather-pic"
                          />
                        ) : null}
                      </div>
                      <div className="forecast-temperature">
                        {item.main ? <p>{item.main.temp.toFixed()}°C</p> : null}
                      </div>
                    </div>
                    <div className="forecast-additional-info">
                      <div>
                        {item.wind ? (
                          <p>{item.wind.speed.toFixed(1)} m/s</p>
                        ) : null}
                      </div>
                      <div>
                        {item.main ? <p>{item.main.humidity} %</p> : null}
                      </div>
                      <div>{item.rain ? item.rain['3h'] : 'Not available'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export default Weather
