
var currentTempEl = document.getElementById("temperature");
var cityEl = document.getElementById("city");
var searchEl = document.getElementById("search-button");
var cityNameEl = document.getElementById("city-name");
var iconEl = document.getElementById("weather-icon"); 
// var cityName = getElementById("city-name");
var humidityEl = document.getElementById("humidity");
var windEl = document.getElementById("wind-speed");
// var currentTime = dayjs().format('dddd, MMM D, YYYY h:mm A');

//https://openweathermap.org/img/wn/10d@2x.png
//assigning a unique API to a variable
var apiKey = "9f9f70b3b395ca9a8a718b7f8b260804";

function getWeather () {
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
            currentTempEl.textContent = Math.round(data.main.temp ) + "°C";
            humidityEl.textContent = data.main.humidity + "%";
            windEl.textContent = data.wind.speed + " km/h";
            }) ;                                            

}

searchEl.addEventListener( "click", getWeather)

function renderHistory (){
    var history = JSON.parse(localStorage.getItem("history")) || [];
    for (var i = 0; i < history.length; i++) {
        var city = history[i];
        var li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-city", city);
        li.setAttribute("class", "list-group-item");
        document.getElementById("history").appendChild(li);
        
    }
    
}
renderHistory();