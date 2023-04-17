const APIKey = "23b89ccd37ecfa0524d0c35eae3690f8";

let searchEl = document.querySelector("#search-city");
let currentCityName;

let weather = [];
let searchList = [];

function weatherDisplay(weather) {
  $("#day-0-wind").text(weather[0].wind);
  $("#day-0-UV").text(weather[0].UV);
  $(`#currentCityName`).text(currentCityName);
  if (weather[0].UV >= 11) {
    uvRating = `Violet`;
  } // Extreme
  if (weather[0].UV < 11) {
    uvRating = `Red`;
  } // Very High
  if (weather[0].UV < 8) {
    uvRating = `Orange`;
  } // High
  if (weather[0].UV < 6) {
    uvRating = `Yellow`;
  } // Moderate
  if (weather[0].UV < 3) {
    uvRating = `Green`;
  } // Low
  $(`#day-0-UV`).css("background-color", uvRating);
  for (var i = 0; i <= 5; i++) {
    $(`#day-${i}-temp`).text(weather[i].temp);
    $(`#day-${i}-hum`).text(weather[i].hum);
    $(`#day-${i}-date`).html(weather[i].date);
    $(`#day-${i}-icon`).attr("src", weather[i].icon);
  }
}

function showSearchList(searchList) {
  let searchResults = "";
  for (let i = 0; i < searchList.length; i++) {
    searchResults += `<li class="btn list-group-item list-group-item-action d-flex justify-content-between align-items-center" onclick="searchApi('${searchList[i]}')">${searchList[i]}</li>`;
  }
  $(`#searchListResults`).html(searchResults);
}

function updateSearchList(currentCityName) {
  searchList.indexOf(currentCityName) === -1
    ? searchList.push(currentCityName)
    : console.log("City already on list");
  localStorage.setItem("searchList", JSON.stringify(searchList));
  showSearchList(searchList);
}

function dailyWeather(latitude, longitude, currentCityName) {
  var localQueryAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&units=imperial&appid=${APIKey}`;
  fetch(localQueryAPI)
    .then(function (res) {
      console.log(res);
      if (!res.ok) {
        throw res.json();
      }
      console.log(res.json);
      return res.json();
    })
    .then(function (locRes) {
      console.log(locRes);
      weather = [];
      updateSearchList(currentCityName);
      for (let i = 0; i < 7; i++) {
        let dailyWether = {
          date: locRes.daily[i].dt,
          temp: locRes.daily[i].temp.day + ` °F`,
          hum: locRes.daily[i].humidity + `%`,
          wind: locRes.daily[i].wind_speed + ` MPH`,
          UV: locRes.daily[i].uvi,
          icon: `https://openweathermap.org/img/wn/${locRes.daily[i].weather[0].icon}.png`,
        };
        dailyWether.date = dailyWether.date * 1000;
        const dateObject = new Date(dailyWether.date);
        dailyWether.date = dateObject.toLocaleDateString();
        weather.push(dailyWether);
      }
      weatherDisplay(weather);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function searchApi(query) {
  let localQueryAPI =
    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${APIKey}`;

  fetch(localQueryAPI)
    .then(function (res) {
      console.log(res);
      if (!res.ok) {
        $("#search-input")[0].reset();
        alert("ERROR: City not found");
        throw res.json();
      }
      console.log(res.json);
      return res.json();
    })
    .then(function (locRes) {
      latitude = locRes.city.coord.lat;
      longitude = locRes.city.coord.lon;
      currentCityName = query;
      console.log(currentCityName + ` located at:` + latitude + `x` + longitude);
      dailyWeather(latitude, longitude, currentCityName);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function handleSearchFormSubmit(e) {
  e.preventDefault();
  let searchInputVal = document.querySelector("#search-input").value;
  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }
  searchApi(searchInputVal);
}

function loadSearchResult(searchList) {
  searchList = JSON.parse(localStorage.getItem("searchList"));
  if (!searchList) {
    searchList = [];
    return searchList;
  }
  return searchList;
}
searchEl.addEventListener("submit", handleSearchFormSubmit);

searchList = loadSearchResult(searchList);

searchApi("Eugene");