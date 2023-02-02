var APIKey = "3a6c0dad8c31e32a34e1dd280e179896";
var weatherApiRootUrl = "https://api.openweathermap.org";
var searchHistory = [];
let city;
let lat = JSON.parse(localStorage.getItem("city.lat")) || [];
let lon = JSON.parse(localStorage.getItem("city.lon")) || [];

let searchElHistory = JSON.parse(localStorage.getItem("city")) || [];

var searchElement = document.querySelector("#city");
var searchBox = new google.maps.places.SearchBox(searchElement);
console.log(searchElement.value);

// Add date to header
// var currentDate = dayjs().format("MMMM D, YYYY");
// $("#currentDate").text(currentDate);

// function trackTime() {
//   // Get current hour
//   const timeNow = dayjs().hour();
// }

// API URL
// let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WeatherAPI}`;

// Google Search Function
searchBox.addListener("places_changed", async function getCity() {
  var place = searchBox.getPlaces()[0];
  if (place == null) return;
  var latitude = place.geometry.location.lat();
  var longitude = place.geometry.location.lng();
  console.log(place);
  await fetch("https://maps.googleapis.com/maps/api/js", {
    mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  })
    .then(function (res) {
      console.log(res);
    })
    .then(function (data) {
      let cityName = document.querySelector("#city").value;

      var city = {
        city: place.formatted_address,
        lat: latitude,
        lon: longitude,
      };

      if (!lat.includes(cityName)) {
        lat.push(city.lat);
      }

      if (!lon.includes(cityName)) {
        lon.push(city.lon);
      }

      if (!searchElHistory.includes(cityName)) {
        searchElHistory.push(city);
        window.localStorage.setItem(
          "SearchHistory",
          JSON.stringify(searchElHistory)
        );
      }

      console.log(data, place.formatted_address);
      showPosition(data, place.formatted_address);
    })
    .catch(function (err) {
      console.error(err);
    });
});

const WeatherAPI = "3a6c0dad8c31e32a34e1dd280e179896";

function showPosition() {
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WeatherAPI}&units=imperial`,
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json);
      showWeatherForcastDayOne(json);
      showWeatherForcastDayTwo(json);
      showWeatherForcastDayThree(json);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function showWeatherForcastDayOne(json) {
  const items = $("#forecast-events-one");
  const events = json.list;
  const weatherParent = document.querySelector(".forecast-container");
  const weatherChild = document.querySelector(".forecast-events");
  const weatherTemp = document.createElement('div');
  weatherChild.appendChild(weatherTemp).textContent = `Temp: ${events[0].main.temp}`;
  console.log(weatherChild);
  // for (let i = 0; i < events.length; i++) {

  // }


  // let i = 0;
  // items.children(".weather-temp").text(`Temp: + ${events[i].main.temp}`);
  // items.children(".weather-wind").text(`Wind: + ${events[i].wind.speed}`);
  // items
  //   .children(".weather-humidity")
  //   .text(`Humidity: + ${events[i].main.humidity}`);
  // console.log(
  //   items.children("weather-temp").text(`Temp + ${events[i].main.temp}`)
  // );
}

// function showWeatherForcastDayOne(json) {
//   const items = $("#forecast-events-one");
//   const events = json.list;
//   let i = 0;
//   items.children(".weather-temp").text(`Temp: + ${events[i].main.temp}`);
//   items.children(".weather-wind").text(`Wind: + ${events[i].wind.speed}`);
//   items
//     .children(".weather-humidity")
//     .text(`Humidity: + ${events[i].main.humidity}`);
//   console.log(
//     items.children("weather-temp").text(`Temp + ${events[i].main.temp}`)
//   );
// }

function showWeatherForcastDayTwo(json) {
  const items = $("#forecast-events-two");
  const events = json.list;
  let i = 1;
  items.children(".weather-temp").text(`Temp: + ${events[i].main.temp}`);
  items.children(".weather-wind").text(`Wind: + ${events[i].wind.speed}`);
  items
    .children(".weather-humidity")
    .text(`Humidity: + ${events[i].main.humidity}`);
  console.log(
    items.children("weather-temp").text(`Temp + ${events[i].main.temp}`)
  );
}

function showWeatherForcastDayThree(json) {
  const items = $("#forecast-events-three");
  const events = json.list;
  let i = 2;
  items.children(".weather-temp").text(`Temp: + ${events[i].main.temp}`);
  items.children(".weather-wind").text(`Wind: + ${events[i].wind.speed}`);
  items
    .children(".weather-humidity")
    .text(`Humidity: + ${events[i].main.humidity}`);
  console.log(
    items.children("weather-temp").text(`Temp + ${events[i].main.temp}`)
  );
}
