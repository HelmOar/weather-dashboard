
var currentTempEl = $("#temperature");
var cityEl = $("#city");
var cityName = $("#city-name");


//assigning a unique API to a variable
var apiKey = "9f9f70b3b395ca9a8a718b7f8b260804";

function getWeather (cityName) {
    //current weather request from open weather API
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(currentTempEl) {
            console.log(currentTempEl);

}
