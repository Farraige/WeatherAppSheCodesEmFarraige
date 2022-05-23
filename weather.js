
function formateDate(date) {
let hours = date.getHours();
if (hours < 10) {
hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
minutes = `0${minutes}`;
}
let dayIndex = date.getDay();
let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];
let day = days[dayIndex];

return `${days[dayIndex]} ${hours}:${minutes}`;
}
function search(event) {
event.preventDefault();
let cityElement = document.querySelector("#city");
let cityInput = document.querySelector("#city-input");
cityElement.innerHTML = cityInput.value;

searchEngine(cityInput.value);
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", search);

dateElement.innerHTML = formateDate(currentTime);

function searchEngine(city) {
let apiKey = "60d6c7645117d27721f091cb48cb8b98"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
console.log(response);
let todaysWeather = Math.round(response.data.main.temp);
let temperatureElement = document.querySelector("#todaysWeather");
let description = document.querySelector("#currently");
let speed = (response.data.wind.speed);
let humiditytTemp= Math.round(response.data.main.humidity);
let currentlyFeelsLike = Math.round(response.data.main.feels_like);
let high = Math.round(response.data.main.temp_max);
let low = Math.round(response.data.main.temp_min);
let dHoursR = hours(response.data.sys.sunrise);
let dMinR = minutes(response.data.sys.sunrise);
let dHoursS= hours(response.data.sys.sunset);
let dMinS = minutes(response.data.sys.sunset);
let humidity = document.querySelector("#humidity");
let tHigh = document.querySelector("#tempHigh");
let tLow = document.querySelector("#tempLow");
let feelsLike = document.querySelector("#feelsLike");
let iconElement = document.querySelector("#icon");
let windElement = document.querySelector("#wind");
let sunriseElement = document.querySelector("#sunR");
let sunsetElement = document.querySelector("#sunS");
sunriseElement.innerHTML `${dHoursR}:${dMinR}`;
sunsetElement.innerHTML `${dHoursS}:${dMinS}`;
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
windElement.innerHTML = `Wind ${speed}MPH`;
humidity.innerHTML = `Humidity ${humiditytTemp}%`;
tHigh.innerHTML= `High ${high}℃`;
tLow.innerHTML= `Low ${low}℃`
feelsLike.innerHTML = `Feels like ${currentlyFeelsLike}℃`
temperatureElement.innerHTML = `${todaysWeather}℃`;
description.innerHTML = response.data.weather[0].description;
}