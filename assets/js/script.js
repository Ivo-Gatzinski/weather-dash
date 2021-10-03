var cityCall = "https://api.openweathermap.org/data/2.5/weather";

var weatherCall = "https://api.openweathermap.org/data/2.5/onecall";

var apiKey = "112bf445259e35c8b97e82d67527af29";

var responseText = document.getElementById('response-text');

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

$(".clear-history").on("click", function() {

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
        var addButton = $(".buttons").add("<button>")
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

// search weather APi function

function searchCity(query) {

    // URL for first API call:
    
    cityUrl = cityCall + "?q=" + query + "&appid=" + apiKey;

    fetch(cityUrl)
    .then(function (response) {
      
      // check the response status for success
      // display the status
      if (response.status === 200) {
        responseText.style.color = 'green';
        responseText.textContent = "Connection status: OK";
      } else if (response.status === 404) {
        responseText.style.color = 'red';
        responseText.textContent = "Connection status: City Not Found";
      } else {
        responseText.style.color = 'red';
        responseText.textContent = "Connection status: Server Down";
      }     
    return response.json();
    })
    .then(function (data) {
// get lat and lon from data:
        lat = data.coord.lat;
        lon = data.coord.lon;
        console.log(lat);
        console.log(lon);
        getWeather(lat, lon);
    });
    
};


//submit city form

form.on("submit", handleFormSubmit);

// search by lat lon function:

function getWeather(lat, lon) {
  weatherUrl = weatherCall + "?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;
  
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        // DISPLAY DATA IN RIGHT CLASSES IN HTML:

    //   for (var i = 0; i < data.data.length; i++) {
    //     displayCurrent(data.data[i]);
    //   }

    });
}

// function displayCurrent(giphyResult) {
//   var imgUrl = giphyResult.images.downsized_large.url;
//   var title = giphyResult.title;

//   var img = $("<img>").attr({
//     src: imgUrl,
//     class: "img-fluid",
//     alt: title,
//   });
//   var col = $("<div>").addClass("col-12 col-lg-6 pb-4").append(img);

//   fiveDays.append(col);
// }




// USE DATA ATTRIBUTES for ITEMS

// Get city input


// attachh city input to first api call

// get lon and lat from first api call

// attach lon and lat to second api call
//

// Part A:
// DISPLAY ONE CITY FORECAST

// THINK OF THE CONCEPTUAL FUNCTIONALITY

// Look at TODOS exercisee

// Part B:

// Search for a city and display forecast
