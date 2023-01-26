var googleAPI = "AIzaSyB1ArNm35-pDU9CT9n74ika7gUKkm-_aB4";
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
    });
});

const WeatherAPI = "3a6c0dad8c31e32a34e1dd280e179896";
// let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WeatherAPI}`;

function showPosition() {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WeatherAPI}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Fetch Response \n-------------");
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function showWeatherForest(json) {
  const items = $("#events");
}
