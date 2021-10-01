var cityCall = "https://api.openweathermap.org/data/2.5/weather"

var oneCall = 'https://api.openweathermap.org/data/2.5/onecall';

var apiKey = "112bf445259e35c8b97e82d67527af29";

var lat = 32.7;
var lon = -117.2;

var cityInput = "San Diego";

var responseText = document.getElementById('response-text');

function getCityApi(url) {
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
  }

getCityApi(cityCall + "?q=" + cityInput + "&appid=" + apiKey);



function getOneApi(url) {
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
  }
  
  getOneApi(oneCall + "?lat=" + lat + "&lon=" + lon +"&appid=" + apiKey);

  
var tableBody = document.getElementById("repo-table");
var fetchButton = document.getElementById("fetch-button");
var cityCall = "https://api.openweathermap.org/data/2.5/weather" + "?q=" + cityInput + "&appid=" + apiKey;

function getCoord() {
  // fetch request gets a list of all the repos for the node.js organization
  
  fetch(cityCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      
      var lon = data.coord.lon;

      console.log(lon);

      var lat = data.coord.lat;

      console.log(lat);

      // Creating elements, tablerow, tabledata, and anchor
      var tableRow = document.createElement("tr");
      var tableData = document.createElement("td");
      var para = document.createElement("p")
      
      //Appending data to table cells
    para.innerHTML = cityInput + ": <hr> " + "lon: " + lon + ", " + "lat: " + lat + ".";

      tableData.appendChild(para);
      tableRow.appendChild(tableData);
      tableBody.appendChild(tableRow);

    });
}

fetchButton.addEventListener("click", getCoord);