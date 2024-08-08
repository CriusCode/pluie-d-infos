// Variables for the various elements of the application
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const weather = document.getElementById("weather");
const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feels_like");
const icon = document.getElementById("icon");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const newDate = document.getElementById("date");
const newDateTime = new Date();

// Function to fetch all the necessary datas in real time, use of try/catch method to manage the errors
async function fetchWeatherData() {
  try {
    const configResponse = await fetch("config.json");
    const configData = await configResponse.json();

    const { apiKey, lat, lon, units } = configData;

    // HTTPS request to the API to fetch all the data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=fr`
    );
    const weatherData = await weatherResponse.json();
    console.log(weatherData);

    icon.innerHTML =
      '<img src= "https://openweathermap.org/img/wn/' +
      weatherData.current.weather[0].icon +
      '@2x.png"/>';
    city.textContent = "Bayonne";
    temperature.textContent = parseInt(weatherData.current.temp) + "°C";
    weather.textContent = "Temps" + " : " + weatherData.current.weather[0].description;
    feelsLike.textContent = "Ressentie" + " : " + parseInt(weatherData.current.feels_like) + "°C";
    const dateSet = new Date(weatherData.current.sunset * 1000);
    const dateRise = new Date(weatherData.current.sunrise * 1000);
    sunset.textContent = "Couché de soleil :" + " " + dateSet.getHours() + "h" + dateSet.getMinutes();
    sunrise.textContent = "Levé de soleil :" + " " + dateRise.getHours() + "h" + dateRise.getMinutes();
    newDate.textContent = newDateTime.getHours() + ":" + newDateTime.getMinutes() + ":" + newDateTime.getSeconds();
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo:", error);
  } finally {
    setTimeout(fetchWeatherData, 3600000);
}
}

fetchWeatherData();

// Function to update the date element
function updateDate() {
    const newDateTime = new Date();
    newDate.textContent = newDateTime.getHours() + ":" + newDateTime.getMinutes() + ":" + newDateTime.getSeconds();
  }
  
  // Call updateDate initially and set an interval to update it every 5 seconds
  updateDate();
  setInterval(updateDate, 1000);