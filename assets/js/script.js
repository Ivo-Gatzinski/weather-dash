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

      currentDate = moment.unix(data.current.dt).format("dddd, MMMM Do, YYYY");

      displayCurrent(data);
      displayFiveDays(data);
    });
}


function displayCurrent(data) {

    // create attributes html for data:
    // append data to html
    // set up variables for selectors + replace text
    
    // header of city searched:
    
    date = $(".current-date").text(currentDate);
    
    icon = $("#icon").attr("src", iconurl)
    
    $(".cityHeader").text(query);
    
    //temp data

    $(".temp").text("Temp: " + data.current.temp + "℉");

    //wind data

    $(".wind").text("Wind: " + data.current.wind_speed + " mph");

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
    }
    if (data.current.uvi >= 3 && data.current.uvi <= 5.99) {
        uviNumber.css("background-color", "yellow");
        uviNumber.css("color", "black");
        uviNumber.css("padding", "0px 5px 0px 5px");
        uviNumber.css("border-radius", "5px");
    }
    if (data.current.uvi >= 6 && data.current.uvi <= 7.99) {
        uviNumber.css("background-color", "orange");
        uviNumber.css("color", "white");
        uviNumber.css("padding", "0px 5px 0px 5px");
        uviNumber.css("border-radius", "5px");
    } 
    if (data.current.uvi >= 8 && data.current.uvi <= 10.99) {
        uviNumber.css("background-color", "red");
        uviNumber.css("color", "white");
        uviNumber.css("padding", "0px 5px 0px 5px");
        uviNumber.css("border-radius", "5px");
    }
    if (data.current.uvi >= 11) {
        uviNumber.css("background-color", "purple");
        uviNumber.css("color", "white");
        uviNumber.css("padding", "0px 5px 0px 5px");
        uviNumber.css("border-radius", "5px");
    }
}

function displayFiveDays(data) {

// date:

    date1 = moment.unix(data.daily[1].dt).format("L");
    date2 = moment.unix(data.daily[2].dt).format("L");
    date3 = moment.unix(data.daily[3].dt).format("L");
    date4 = moment.unix(data.daily[4].dt).format("L");
    date5 = moment.unix(data.daily[5].dt).format("L");

    $(".date1").text(date1);
    $(".date2").text(date2);
    $(".date3").text(date3);
    $(".date4").text(date4);
    $(".date5").text(date5);

// icons:

    // get icon code

// 1
    iconcode1 = data.daily[1].weather[0].icon;
        
    // get icon image

    iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";

    // append icon image

    icon1 = $("#icon1").attr("src", iconurl1);
// 2  

    iconcode2 = data.daily[2].weather[0].icon;

    iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";

    icon2 = $("#icon2").attr("src", iconurl2);

 // 3   
    
 iconcode3 = data.daily[3].weather[0].icon;

 iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";

 icon3 = $("#icon3").attr("src", iconurl3);

 // 4
 
 iconcode4 = data.daily[4].weather[0].icon;

 iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";

 icon4 = $("#icon4").attr("src", iconurl4);

 // 5
 
 iconcode5 = data.daily[5].weather[0].icon;

 iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";

 icon5 = $("#icon5").attr("src", iconurl5);

 // temp

 temp1 = data.daily[1].temp.day;
 temp2 = data.daily[2].temp.day;
 temp3 = data.daily[3].temp.day;
 temp4 = data.daily[4].temp.day;
 temp5 = data.daily[5].temp.day;

 $(".temp1").text("Temp: " + temp1 + "℉");
 $(".temp2").text("Temp: " + temp2 + "℉");
 $(".temp3").text("Temp: " + temp3 + "℉");
 $(".temp4").text("Temp: " + temp4 + "℉");
 $(".temp5").text("Temp: " + temp5 + "℉");

// wind

wind1 = data.daily[1].wind_speed;
wind2 = data.daily[2].wind_speed;
wind3 = data.daily[3].wind_speed;
wind4 = data.daily[4].wind_speed;
wind5 = data.daily[5].wind_speed;

$(".wind1").text("Wind: " + wind1 + " mph");
$(".wind2").text("Wind: " + wind2 + " mph");
$(".wind3").text("Wind: " + wind3 + " mph");
$(".wind4").text("Wind: " + wind4 + " mph");
$(".wind5").text("Wind: " + wind5 + " mph");

// humidity

humid1 = data.daily[1].humidity;
humid2 = data.daily[2].humidity;
humid3 = data.daily[3].humidity;
humid4 = data.daily[4].humidity;
humid5 = data.daily[5].humidity;

$(".humid1").text("Humidity: " + humid1 + " %");
$(".humid2").text("Humidity: " + humid2 + " %");
$(".humid3").text("Humidity: " + humid3 + " %");
$(".humid4").text("Humidity: " + humid4 + " %");
$(".humid5").text("Humidity: " + humid5 + " %");

}

//submit city form

form.on("submit", handleFormSubmit);
