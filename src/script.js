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
  let newCity = response.data.name;
  console.log(newCity);
  let originalCity = document.querySelector("h1");
  originalCity.innerHTML = newCity;

  let newTemp = Math.round(response.data.main.temp);
  let originalTemp = document.querySelector("#temp-value");
  originalTemp.innerHTML = newTemp;

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
