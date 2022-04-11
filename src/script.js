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
  let city = `lat=${lat}&lon=${lon}`;

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeData);

  apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeCountry);
}

// search for another city

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newSearch);

function newSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  city = cityInput.value;

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeData);

  apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeCountry);
}

function changeData(response) {
  console.log(response);

  function changeCity(response) {
    let newCity = response.data.name;
    let originalCity = document.querySelector("h1");
    originalCity.innerHTML = newCity;
  }

  function changeTemp(response) {
    let newTemp = Math.round(response.data.main.temp);
    let originalTemp = document.querySelector("#temp-value");
    originalTemp.innerHTML = newTemp;

    let newTempMax = Math.round(response.data.main.temp_max);
    let originalTempMax = document.querySelector("#temp-max");
    originalTempMax.innerHTML = `${newTempMax}°`;

    let newTempMin = Math.round(response.data.main.temp_min);
    let originalTempMin = document.querySelector("#temp-min");
    originalTempMin.innerHTML = `${newTempMin}°`;
  }

  function changeEmoji(response) {
    let newIcon = response.data.weather[0].icon;
    let originalIcon = document.querySelector("#icon");
    originalIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${newIcon}@2x.png`
    );
  }

  function changeSun(response) {
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
    let originalSunrise = document.querySelector("#sunrise");
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
    let originalSunset = document.querySelector("#sunset");
    originalSunset.innerHTML = newSunset;
  }

  function changeConditions(response) {
    let newDescription = response.data.weather[0].description;
    let originalDescription = document.querySelector("#description");
    originalDescription.innerHTML = newDescription;

    let newHumidity = response.data.main.humidity;
    let originalHumidity = document.querySelector("#humidity");
    originalHumidity.innerHTML = newHumidity;

    let newWind = Math.round(response.data.wind.speed);
    let originalWind = document.querySelector("#wind");
    originalWind.innerHTML = newWind;
  }

  changeCity(response);
  changeTemp(response);
  changeEmoji(response);
  changeSun(response);
  changeConditions(response);
  showForecast();
}

function changeCountry(response) {
  let newCountry = response.data[0].country;
  let originalCountry = document.querySelector("h6");
  originalCountry.innerHTML = newCountry;
}

// change temperature units

function changeUnits(event) {
  event.preventDefault();
  let newUnits = document.querySelector("#different-units");

  if (newUnits.textContent === "F") {
    units = "imperial";
  } else {
    units = "metric";
  }

  let originalUnits = document.querySelector("#current-units");
  let changedUnits = originalUnits.textContent;
  originalUnits.innerHTML = newUnits.textContent;
  newUnits.innerHTML = changedUnits;

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeData);
}

let newUnits = document.querySelector("#different-units");
newUnits.addEventListener("click", changeUnits);

// global variables = default city search

let city = "Rio De Janeiro";
let units = "metric";

let apiKey = "14af575613645726e379f956e6774a6e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(changeData);

// get real forecast data

function showForecast() {
  let originalForecast = document.querySelector("#forecast");
  let newForecast = `<div class="row">`;

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    newForecast =
      newForecast +
      `
      <div class="col">
        <div class="forecast-weekdays">${day}</div>
        <div class="forecast-emoji">
          <i class="fa fa-solid fa-sun emoji">
          </i>
        </div>
        <div class="forecast-numbers">
          <span class="forecast-temp-max">30°</span>
          <span class="forecast-temp-min">10°</span>
        </div>
      </div>
    `;
  });
  newForecast = newForecast + `</div>`;
  originalForecast.innerHTML = newForecast;
}
