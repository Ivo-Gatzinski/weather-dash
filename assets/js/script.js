var cityCall = "https://api.openweathermap.org/data/2.5/weather";

var weatherCall = "https://api.openweathermap.org/data/2.5/onecall";

var apiKey = "112bf445259e35c8b97e82d67527af29";

var responseText = document.getElementById("response-text");

var searchHistory = [];
var form = $(".search-form");
var searchInput = $(".form-control");

var historySearch = $(".historySearch");
var buttons = $(".buttons");

var lat = "";
var lon = "";

var todayForecast = $(".today-forecast");
var fiveDays = $(".five-days");

//init search history
searchHistory = localStorage.getItem("search-history");
if (searchHistory) {
  searchHistory = JSON.parse(searchHistory);
  displayButtons();
} else {
  searchHistory = [];
}

//clear history button

$(".clear-history").on("click", function () {
  localStorage.clear();
  searchHistory = [];
  displayButtons();
});

// get city search

function handleFormSubmit(event) {
  event.preventDefault();
  query = searchInput.val().trim();
  if (query) {
    //call search Weather API function:
    searchCity(query);
    // add city to search history
    addSearchToHistory(query);
    // clear the form
    searchInput.val("");
  }
}

// display history buttons

function displayButtons() {
  historySearch.empty();
  // loop over searchHistory
  for (i = searchHistory.length - 1; i >= 0; i--) {
    //create button element to add
    var addButton = $(".buttons")
      .add("<button>")
      .attr({
        type: "button",
        class: "btn btn-outline-success btn-block history-button",
      })
      .text(searchHistory[i]);
    // append button element
    historySearch.append(addButton);
  }
  // search from history button:

  $(".history-button").on("click", function () {
    query = this.textContent;
    searchCity(query);
  });
}

// add city to search history in local storage and display button

function addSearchToHistory(query) {
  searchHistory.push(query);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  displayButtons();
}

// search for city in weather APi function

function searchCity(query) {
  // URL for first API call:

  cityUrl = cityCall + "?q=" + query + "&appid=" + apiKey;

  fetch(cityUrl)
    .then(function (response) {
      // check the response status for success
      // display the status
      if (response.status === 200) {
        responseText.style.color = "green";
        responseText.textContent = "Connection status: OK";
      } else if (response.status === 404) {
        responseText.style.color = "red";
        responseText.textContent = "Connection status: City Not Found";
      } else {
        responseText.style.color = "red";
        responseText.textContent = "Connection status: Server Down";
      }
      return response.json();
    })
    .then(function (data) {

        // get icon code

        iconcode = data.weather[0].icon;
        
        // get icon image

        iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

      // get lat and lon from data:
      lat = data.coord.lat;
      lon = data.coord.lon;

      //plug in lat lon into one call api:
      getWeather(lat, lon);
    });
}

// search by lat lon function:

function getWeather(lat, lon) {
  weatherUrl =
    weatherCall +
    "?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    apiKey;

  fetch(weatherUrl)
  .then(function (response) {  
      // check the response status for success
      // display the status
      if (response.status === 200) {
        responseText.style.color = "green";
        responseText.textContent = "Connection status: OK";
      } else if (response.status === 404) {
        responseText.style.color = "red";
        responseText.textContent = "Connection status: City Not Found";
      } else {
        responseText.style.color = "red";
        responseText.textContent = "Connection status: Server Down";
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      currentDate = moment.unix(data.current.dt).format("LLLL");

      displayCurrent(data);
      displayFiveDays(data);
    });
}

// USE DATA ATTRIBUTES for ITEMS

// Look at TODOS exercisee

function displayCurrent(data) {

    // create attributes html for data:
    // append data to html
    // set up variables for selectors + replace text
    
    // header of city searched:
    
    date = $(".current-date").text(currentDate);
    
    icon = $("#icon").attr("src", iconurl)
    
    $(".cityHeader").text(query + ": ");
    
    //temp data

    $(".temp").text("Temp: " + data.current.temp + "℉");

    //wind data

    $(".wind").text("Wind: " + data.current.wind_speed + " MPH");

    // humidity data

    $(".humid").text("Humidity: " + data.current.humidity + " %");

    // uvi index
    var uvi = $(".uvi");

    var uviNumber = $(".uvi-number");

    uviNumber.text(data.current.uvi);

    uvi.text("UV Index: ");

    if (data.current.uvi < 3) {
        uviNumber.css("background-color", "green");
        uviNumber.css("color", "white");
        uviNumber.css("padding", "0px 5px 0px 5px");
        uviNumber.css("border-radius", "5px");
    } else if (data.current.uvi == 4 || data.current.uvi == 5) {
        uviNumber.css("background-color", "yellow");
        uviNumber.css("color", "white");
        uviNumber.css("padding", "0px 5px 0px 5px");
        uviNumber.css("border-radius", "5px");
    } else if (data.current.uvi == 6 || data.current.uvi == 7) {
        uviNumber.css("background-color", "orange");
        uviNumber.css("color", "white");
        uviNumber.css("padding", "0px 5px 0px 5px");
        uviNumber.css("border-radius", "5px");
    } else if (data.current.uvi == 8 || data.current.uvi == 9 || data.current.uvi == 10) {
        uviNumber.css("background-color", "red");
        uviNumber.css("color", "white");
        uviNumber.css("padding", "0px 5px 0px 5px");
        uviNumber.css("border-radius", "5px");
    } else { 
        uviNumber.css("background-color", "purple");
        uviNumber.css("color", "white");
        uviNumber.css("padding", "0px 5px 0px 5px");
        uviNumber.css("border-radius", "5px");

}
}


function displayFiveDays(data) {

date1 = data.current.daily[1].dt;

    daily1 = moment.unix(data.current.daily[1].dt).format("L");
    daily2 = moment.unix(data.current.daily[2].dt).format("L");
    daily3 = moment.unix(data.current.daily[3].dt).format("L");
    daily4 = moment.unix(data.current.daily[4].dt).format("L");
    daily5 = moment.unix(data.current.daily[5].dt).format("L");

    console.log(date1);

//   // set up variables for selectors:
//   // create attributes html for data:
//   // append data to html:
}

//submit city form

form.on("submit", handleFormSubmit);
