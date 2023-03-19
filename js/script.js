
var currentTempEl = document.getElementById("temperature");
var cityEl = document.getElementById("city");
var searchEl = document.getElementById("search-button");
var cityNameEl = document.getElementById("city-name");
var iconEl = document.getElementById("weather-icon"); 
// var cityName = getElementById("city-name");
var humidityEl = document.getElementById("humidity");
var windEl = document.getElementById("wind-speed");
var clearEl = document.getElementById("clear-history");
var forecastEls = document.querySelectorAll("forecast"); 
var fivedayEl = document.getElementById("fiveday-header");

//https://openweathermap.org/img/wn/10d@2x.png
//assigning a unique API to a variable
var apiKey = "9f9f70b3b395ca9a8a718b7f8b260804";

function getWeather (cityName) {
    //current weather request from open weather API
        var city = cityEl.value;
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

       fetch(queryURL)
        .then(function(response) {
            return response.json();
        })      

        .then(function(data) {
            console.log(data);


            var history = JSON.parse(localStorage.getItem("history")) || [];
            history.push(data.name);
            localStorage.setItem("history", JSON.stringify(history));

           
            cityNameEl.textContent = data.name;
            var link = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            iconEl.setAttribute("src", link);
            currentTempEl.textContent = "Temperature " + Math.round(data.main.temp ) + "°C";
            humidityEl.textContent = "Humidity "+ data.main.humidity + "%";
            windEl.textContent = "Wind speed "+ data.wind.speed + " km/h";
            }) ;                                            

}

searchEl.addEventListener( "click", getWeather)

function getForcast () {
   var cityForcast = cityEl.value; 
   var forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityForcast}&units=metric&appid=${apiKey}`;
    
    fetch(forecastQueryURL)
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
    console.log(data);
    }) ;
}
    
searchEl.addEventListener( "click", getForcast)

 fivedayEl.classList.remove("d-none");
//  var forecastEls = document.querySelectorAll(".forecast");    

// function renderForcast(){
 
// }

//   

 

//create buttons for 
//
var button
var historyContainer = document.getElementById("history")

function renderHistory (){
    var history = JSON.parse(localStorage.getItem("history")) || [];
    for (var i = 0; i < history.length; i++) {
        var city = history[i];
        button = document.createElement("button");
        button.textContent = city;
        button.setAttribute("data-city", city);
        button.setAttribute("class", "list-group-item");
        historyContainer.appendChild(button);

    }
    
}
renderHistory();

historyContainer.addEventListener("click", function (e) {
    e.preventDefault();
    cityEl.value = e.target.textContent;
    getWeather();

})
//event listener for button .. clicked run a function to get the nme of the button... 
//event.target.value... get weather and pass in the name for the weather and update...


// Clear History button
clearEl.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    
})
renderHistory();

