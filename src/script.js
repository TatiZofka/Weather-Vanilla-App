// display current date and time

let rightNow = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekdays[rightNow.getDay()];
let hour = rightNow.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = rightNow.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDateTime = `${day} ${hour}:${minutes}`;

let today = document.querySelector("#current-date-time");
today.innerHTML = currentDateTime;

// use current location as a default

navigator.geolocation.getCurrentPosition(myPlace);

function myPlace(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let myCity = `lat=${lat}&lon=${lon}`;

  let apiKey = "14af575613645726e379f956e6774a6e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${myCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeTemp);
}

// search for another city

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let city = cityInput.value;

  let apiKey = "14af575613645726e379f956e6774a6e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeTemp);
}

function changeTemp(response) {
  console.log(response);
  let newCity = response.data.name;
  let originalCity = document.querySelector("h1");
  originalCity.innerHTML = newCity;

  let newTemp = Math.round(response.data.main.temp);
  let originalTemp = document.querySelector("#temp-value");
  originalTemp.innerHTML = newTemp;

  let newTempMin = Math.round(response.data.main.temp_min);
  let originalTempMin = document.querySelector(`#temp-min`);
  originalTempMin.innerHTML = newTempMin;

  let newTempMax = Math.round(response.data.main.temp_max);
  let originalTempMax = document.querySelector(`#temp-max`);
  originalTempMax.innerHTML = newTempMax;

  let newSunrise = response.data.sys.sunrise;
  var date1 = new Date(newSunrise * 1000);
  var hours1 = date1.getHours();
  var minutes1 = date1.getMinutes();
  if (hours1 < 10) {
    hours1 = `0${hours1}`;
  }
  if (minutes1 < 10) {
    minutes1 = `0${minutes1}`;
  }
  newSunrise = `${hours1} : ${minutes1}`;
  let originalSunrise = document.querySelector(`#sunrise`);
  originalSunrise.innerHTML = newSunrise;

  let newSunset = response.data.sys.sunset;
  var date2 = new Date(newSunset * 1000);
  var hours2 = date2.getHours();
  var minutes2 = date2.getMinutes();
  if (hours2 < 10) {
    hours2 = `0${hours2}`;
  }
  if (minutes2 < 10) {
    minutes2 = `0${minutes2}`;
  }
  newSunset = `${hours2} : ${minutes2}`;
  let originalSunset = document.querySelector(`#sunset`);
  originalSunset.innerHTML = newSunset;

  let newDescription = response.data.weather[0].description;
  let originalDescription = document.querySelector(`#description`);
  originalDescription.innerHTML = newDescription;

  let newHumidity = response.data.main.humidity;
  let originalHumidity = document.querySelector(`#humidity`);
  originalHumidity.innerHTML = newHumidity;

  let newWind = Math.round(response.data.wind.speed);
  let originalWind = document.querySelector(`#wind`);
  originalWind.innerHTML = newWind;

  let apiKey = "14af575613645726e379f956e6774a6e";
  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${newCity}&appid=${apiKey}`;

  axios.get(apiUrl).then(changeCountry);
}

// change country & continent

function changeCountry(response) {
  let newCountry = response.data[0].country;
  let originalCountry = document.querySelector("h6");
  originalCountry.innerHTML = newCountry;
}

// change metrics

function toFarenheit(event) {
  event.preventDefault();
  let value = document.querySelector("#temp-value").innerText;
  let newValue = value * 1.8 + 32;
  newValue = Math.round(newValue);
  let oldValue = document.querySelector("#temp-value");
  oldValue.innerHTML = newValue;
}

function toCelsius(event) {
  event.preventDefault();
  let value = document.querySelector("#temp-value").innerText;
  let newValue = (value - 32) * 0.5555556;
  newValue = Math.round(newValue);
  let oldValue = document.querySelector("#temp-value");
  oldValue.innerHTML = newValue;
}

let celsius = document.querySelector(".celsius");
let farenheit = document.querySelector(".farenheit");

farenheit.addEventListener("click", toFarenheit);
celsius.addEventListener("click", toCelsius);
