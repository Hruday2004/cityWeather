import clear_sky_day from "./assets/clear_sky_day.jpg";
import clear_sky_night from "./assets/clear_sky_night.jpg";
import few_clouds_day from "./assets/few_clouds_day.jpg";
import few_clouds_night from "./assets/few_clouds_night.jpeg";
import haze_day from "./assets/haze_day.webp";
import haze_night from "./assets/haze_night.jpg";
import overcast_clouds_day from "./assets/overcast_clouds_day.jpg";
import overcast_clouds_night from "./assets/overcast_clouds_night.jpg";
import rain_day from "./assets/rain_day.jpg";
import rain_night from "./assets/rain_night.jpg";
import scattered_clouds_day from "./assets/scattered_clouds_day.webp";
import scattered_clouds_night from "./assets/scattered_clouds_night.jpg";
import snowy_day from "./assets/snowy_day.jpg";
import snowy_night from "./assets/snowy_night.jpeg";
import thunderstorm_day from "./assets/thunderstorm_day.webp";
import thunderstorm_night from "./assets/thunderstorm_night.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./WeatherService";

function App() {

  const bg_map = new Map()

  bg_map.set("01d", clear_sky_day)
  bg_map.set("01n", clear_sky_night)
  bg_map.set("02d", few_clouds_day)
  bg_map.set("02n", few_clouds_night)
  bg_map.set("03d", scattered_clouds_day)
  bg_map.set("03n", scattered_clouds_night)
  bg_map.set("04d", overcast_clouds_day)
  bg_map.set("04n", overcast_clouds_night)
  bg_map.set("09d", rain_day)
  bg_map.set("09n", rain_night)
  bg_map.set("10d", rain_day)
  bg_map.set("10n", rain_night)
  bg_map.set("11d", thunderstorm_day)
  bg_map.set("11n", thunderstorm_night)
  bg_map.set("13d", snowy_day)
  bg_map.set("13n", snowy_night)
  bg_map.set("50d", haze_day)
  bg_map.set("50n", haze_night)
  //useState is basically like a function to change the
  //value of a variable with a given function name

  const [city, setCity] = useState("Paris");

  const [weather, setWeather] = useState(null);

  const [units, setUnits] = useState("imperial");

  const [bg, setBg] = useState(clear_sky_day);

  const [error, setError] = useState(null);

  const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

  //useEffect is like listener in android.
  //It runs the function when something change from the deps

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);
      setError(data.error);

      //dynamic bg

      setBg(bg_map.get(data.icon))
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";

    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section_inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
              {error && <p>{error}</p>}
            </div>
            <div className="section section_temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={makeIconURL(weather.icon)} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp} °${units === "metric" ? "C" : "F"}`}</h1>
              </div>
            </div>

            {!error && <Descriptions weather={weather} units={units} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
