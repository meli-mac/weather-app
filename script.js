// Search city feature //
function getForecast(coordinates) {
  let apiKey = "49b631c45785fe73d2a88477803dea22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document
    .querySelector("#weatherIcon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  fahrenheitTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "49b631c45785fe73d2a88477803dea22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
function searchLocation(position) {
  let apiKey = "49b631c45785fe73d2a88477803dea22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("New York");

// Time and date feature //
function currentDate(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[time.getMonth()];
  let date = time.getDate();
  let year = time.getFullYear();
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${month} ${date}, ${year} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = currentDate(currentTime);

// Converting fahrenheit to celsius //
function convertToCelsius(event) {
  event.preventDefault();
  let degreeUnit = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperature = Number(temperature);
  degreeUnit.innerHTML = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
}
let degreeUnit = document.querySelector("#temperature");
let temperature = degreeUnit.innerHTML;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// Converting celsius to fahrenheit //

function convertToFahrenheit(event) {
  event.preventDefault();
  let degreeUnit = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperature = Number(temperature);
  degreeUnit.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let fahrenheitTemperature = null;

// Forecast //

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weatherForecastDate">${day}</div>
          <div class="weatherIconForecast">
              <i class="fa-solid fa-cloud"></i>
          </div>
      <div class="weatherForecastTemp">
      <span class="weatherForecastTempFahrenheit">51°F</span> |
      <span class="weatherForecastTempCelsius">10°C</span>
      </div>
  `;
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
  console.log(response.data.list);
}
