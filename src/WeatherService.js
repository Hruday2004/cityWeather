const API_KEY = "5e06077003a440d8a42d94bf2994d7c7";

const getFormattedWeatherData = async (city, units = "metric") => {

  var error = null

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const response = await fetch(URL);

  if(!response.ok) {
    error = 'Enter Correct City Name' ;
    return {error,};
  }
  else error = null

  const data = await response.json();

  //destructuring assignment
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    error,
    description,
    icon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export { getFormattedWeatherData };
