var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall';

var apiKey = "112bf445259e35c8b97e82d67527af29"

var lat = 41;
var lon = 33;

var responseText = document.getElementById('response-text');

function getApi(url) {
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

getApi(requestUrl + "?lat=" + lat + "&lon=" + lon +"&appid=" + apiKey);
