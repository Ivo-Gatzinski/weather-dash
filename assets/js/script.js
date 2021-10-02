var cityCall = "https://api.openweathermap.org/data/2.5/weather";

var apiKey = "112bf445259e35c8b97e82d67527af29";

var responseText = document.getElementById('response-text');

var searchHistory = [];
var form = $(".search-form");
var searchInput = $(".form-control");

var historySearch = $(".historySearch");

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

    searchHistory = [];
    displayButtons();

});

// get city search

function handleFormSubmit(event) {
  event.preventDefault();
  query = searchInput.val().trim();
  if (query) {
    searchWeather(query);
    addSearchToHistory(query);
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
          class: "btn btn-outline-success btn-block",
        })
        .text(searchHistory[i]);
        // append button element
      historySearch.append(addButton);
    }
  }
  
  // add city to search history in local storage and display button
  
  function addSearchToHistory(query) {
    searchHistory.push(query);
      localStorage.setItem("search-history", JSON.stringify(searchHistory));
      displayButtons();
    }

    // URL for first API call:

url = cityCall + "?q=" + query + "&appid=" + apiKey;

// search weather APi function

function searchWeather(url) {
    
    fetch(url)
    .then(function (response) {
      console.log(response);
      // display the status

      responseText.textContent = response.status;
      // check the response status for success
      if (response.status === 200) {
        responseText.style.color = 'green';
      } else {
        responseText.style.color = 'red';
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

//call search Weather API function:

searchWeather();

//submit city form

form.on("submit", handleFormSubmit);



// //pass to search API

// function handleSearchClick() {
//   searchApi(this.textContent);
// }

// //search and display functions:

// function searchApi(query) {
//   var requestUrl =
//     "hhttps://api.openweathermap.org/data/2.5/onecall" +
//     "&q=" +
//     query +
//     "&units=Imperial" +
//     "&appid=" +
//     apiKey;
//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       resultsContainer.empty();
//       for (var i = 0; i < data.data.length; i++) {
//         displayCurrent(data.data[i]);
//       }
//     });
// }

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
