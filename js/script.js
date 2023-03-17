
var currentTempEl = document.getElementById("temperature");
var cityEl = document.getElementById("city");
var cityName = document.getElementById("city-name");


//assigning a unique API to a variable
var apiKey = "9f9f70b3b395ca9a8a718b7f8b260804";

function getWeather (cityName) {
    //current weather request from open weather API
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';

        fetch(apiUrl)
        .then(function (response) {
        response.json();
        })
        .then(function (data) {
            
        displayTemperature(currentTempEl);
        });
    

}