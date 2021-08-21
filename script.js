const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "Jan",
  "Feb",
  "mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const APIkey = "91232b66dc8a72102a9a904d1232bbf7";
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    hoursIn12HrFormat + ":" + minutes + " " + `<span id="am-pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + "," + date + " " + months[month];
}, 1000);

function getWeatherData(cityName) {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                //do stuff here
                console.log("current weather data",data);

                document.querySelector("#time-zone").textContent = data.name;

                document.querySelector("#country").textContent = data.sys.country;

                const template =  `
                <div class="weather-item">
                    <div>humidity</div>
                    <div>${data.main.humidity}%</div>
                </div>
                <div class="weather-item">
                    <div>pressure</div>
                    <div>${data.main.humidity} psi</div>
                </div>
                <div class="weather-item">
                    <div>wind speed</div>
                    <div>${data.wind.speed} mph</div>
                </div>
                `

                document.querySelector("#current-weather-items").innerHTML = template;
            }
        )
}

function getForecast(cityName) {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            //do stuff here
            console.log("forecast weather data",data);

            const cleanData = data.list.filter((datum) => datum.dt_txt.includes("12:00:00"));

            console.log(cleanData)

            let template = "";
            cleanData.forEach((clean) => {
                template += `
                <div class="weather-forecast-item">
                    <div class="day">${clean.dt_txt.split(" ")[0]}</div>
                    <img
                    src=" http://openweathermap.org/img/wn/${clean.weather[0].icon}.png"
                    alt="weather-icon"
                    class="w-icon"/>
                    <div class="temp">MIN ${clean.main.temp_min}&#176; F</div>
                    <div class="temp">MAX ${clean.main.temp_max}&#176; F</div>
                </div>
                `;
            });

            // document.querySelector("#time-zone").textContent = data.name;

            // document.querySelector("#country").textContent = data.sys.country;

            // const template =  `
            // <div class="weather-item">
            //     <div>humidity</div>
            //     <div>${data.main.humidity}%</div>
            // </div>
            // <div class="weather-item">
            //     <div>pressure</div>
            //     <div>${data.main.humidity} psi</div>
            // </div>
            // <div class="weather-item">
            //     <div>wind speed</div>
            //     <div>${data.wind.speed} mph</div>
            // </div>
            // `

             document.querySelector(".future-forecast").innerHTML = template;
        }
    )
}

document.querySelector("#location").addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = document.querySelector("#search").value;
    getWeatherData(cityName);
    getForecast(cityName)
});