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

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = "https://api.github.com/orgs/nodejs/repos";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Loop over the data to generate a table, each table row will have a link to the repo url
      for (var i = 0; i < data.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        var tableRow = document.createElement("tr");
        var tableData = document.createElement("td");
        var link = document.createElement("a");

        // Setting the text of link and the href of the link
        link.textContent = data[i].html_url;
        link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        tableRow.appendChild(tableData);
        tableBody.appendChild(tableRow);
      }
    });
}

fetchButton.addEventListener("click", getApi);