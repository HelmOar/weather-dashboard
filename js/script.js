
var currentTempEl = document.getElementById("temperature");
var cityEl = document.getElementById("city");
var searchEl = document.getElementById("search-button");
var cityNameEl = document.getElementById("city-name");
var iconEl = document.getElementById("weather-icon"); 
// var cityName = getElementById("city-name");
var humidityEl = document.getElementById("humidity");
var windEl = document.getElementById("wind-speed");
var clearEl = document.getElementById("clear-history");
var forecastEl = document.querySelectorAll("forecast"); 
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
            console.log(history);
            if (history.includes(data.name)) {
            } else {

            history.push(data.name);
            }
            localStorage.setItem("history", JSON.stringify(history));

           
            cityNameEl.textContent = data.name;
            var link = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            iconEl.setAttribute("src", link);
            currentTempEl.textContent = "Temperature " + Math.round(data.main.temp ) + "°C";
            humidityEl.textContent = "Humidity "+ data.main.humidity + "%";
            windEl.textContent = "Wind speed "+ data.wind.speed + " km/h";
            }) ;                                            

}



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
var forecastDate= document.querySelectorAll(".forecast");    

function renderForcast(){
    for (i = 0; i < forecastEl.length; i++) {
        forecastEl[i].innerHTML = "";
        
        var forecastDate = new Date(response.data);
        var forecastDay = forecastDate.getDate();
        var forecastMonth = forecastDate.getMonth();
        var forecastYear = forecastDate.getFullYear();
        var forecastDateEl = document.createElement("p");
        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
        forecastEl[i].append(forecastDateEl);
    }
}
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
        button.setAttribute("class", "form-control d-block bg-white");
    }
    
};


historyContainer.addEventListener("click", function (e) {
    e.preventDefault();
    cityEl.value = e.target.textContent;
    getWeather();

})
//event listener for button .. clicked run a function to get the nme of the button... 
//event.target.value... get weather and pass in the name for the weather and update...


// Clear History button
clearEl.addEventListener("click", function () {
    // preventDefault()
    localStorage.clear();
    searchHistory = [];
    historyContainer.innerHTML = "";
    
})
searchEl.addEventListener( "click", function () {
    getWeather();
   
})

renderHistory();
