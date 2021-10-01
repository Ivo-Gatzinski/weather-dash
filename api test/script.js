var cityCall = "https://api.openweathermap.org/data/2.5/weather"

var oneCall = 'https://api.openweathermap.org/data/2.5/onecall';

var apiKey = "112bf445259e35c8b97e82d67527af29"

var lat = 32;
var lon = -117;

var city = "San Diego";

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

getCityApi(cityCall + "?q=" + city + "&appid=" + apiKey)


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