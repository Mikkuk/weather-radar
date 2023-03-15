import { cityCoordinates } from '../data/cities'

const cityOptions = Object.keys(cityCoordinates).map((city) => (
  <option key={city} value={city}>
    {city}
  </option>
))

export const SelectCity = ({ setSelectedCity }) => {
  const handleCityChange = (event) => {
    const selectedCity = event.target.value
    setSelectedCity(selectedCity)
  }

  return (
    <div className="section city-select">
      <label htmlFor="dropdown"></label>
      <select id="dropdown" onChange={handleCityChange}>
        <option value="">Kaikki kaupungit</option>
        {cityOptions}
      </select>
    </div>
  )
}

export default SelectCity
