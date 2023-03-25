
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
var lon = 0;
var lat = 0;

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
            console.log(data.coord);


            lon = data.coord.lon;
            lat = data.coord.lat;
            console.log(lon);
            console.log(lat);

            //get forcast function to display daily weather

            getForcast(data);

            var history = JSON.parse(localStorage.getItem("history")) || [];
            console.log(history);
            if (history.includes(data.name)) {
            } else {

            history.push(data.name);
            }
            localStorage.setItem(city, JSON.stringify(data));
            localStorage.setItem("history", JSON.stringify(history));

            
        //    display data on page
            cityNameEl.textContent = data.name;
            var link = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            iconEl.setAttribute("src", link);
            currentTempEl.textContent = "Temperature " + Math.round(data.main.temp ) + "°C";
            humidityEl.textContent = "Humidity "+ data.main.humidity + "%";
            windEl.textContent = "Wind speed "+ data.wind.speed + " km/h";
            }) ;                                            

}

//function to retrieve 5 day forca

function getForcast (data) {

   var forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//    
console.log(forecastQueryURL.data);
    fetch(forecastQueryURL)
    .then(function(response) {
        console.log(response);


        return response.json();
    })

    .then(function(data) {
        console.log(data);
    renderForcast(data);
    }) ;
}
    
// searchEl.addEventListener( "click", getForcast); 
var rowEl = document.getElementById ("row");

searchEl.addEventListener( "click", function(){
    //call to other function to remove hidden elements
    fivedayEl.classList.remove("d-none");
    rowEl.classList.remove("d-none");
    getForcast()
});

//function to render forcast to page

function renderForcast(data){

    console.log(data.list);

    for (i = 5; i <40; i=i+8) {

        var divEL = document.getElementById(`card-${[i]}`);
        var date = document.getElementById(`date-${[i]}`);
        var icon = document.getElementById(`forecast-icon-${[i]}`);
        var temp = document.getElementById(`temp-${[i]}`);
        var humid = document.getElementById(`humid-${[i]}`);
        var wind = document.getElementById(`win-${[i]}`);
        var link = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
     console.log(divEL);
     console.log(temp);

     var unformattedDate = data.list[i].dt_txt
     var formattedDate = dayjs().format("dddd DD/MM/YYYY") 

     temp.textContent = "Temperature " + Math.round(data.list[i].main.temp ) + "°C";
     humid.textContent = "Humidity "+ data.list[i].main.humidity + "%";
     date.textContent = data.list[i].dt_txt;
     wind.textContent = "Wind speed "+ data.list[i].wind.speed + " km/h";
     icon.setAttribute("src", link);
     date.textContent = formattedDate;
    
}};

//create buttons for history

var button
var historyContainer = document.getElementById("history")

//function to retrieve and display history

function renderHistory (){
   
    var history = JSON.parse(localStorage.getItem("history")) || [];
    console.log( "history", history);
    if (history.length > 0) {
        for (var i = 0; i < history.length; i++) {
            var city = history[i];
            button = document.createElement("button");
            button.textContent = city;
            button.setAttribute("data-city", city);
            button.setAttribute("class", "list-group-item");
            historyContainer.appendChild(button);
            button.setAttribute("class", "form-control d-block bg-white");
    
        }
        //get last city searched
        var lastCity = history[history.length-1];
        cityEl.value = lastCity
        getWeather();
        getForcast();
    }
    
    
};


historyContainer.addEventListener("click", function (e) {
    e.preventDefault();
    cityEl.value = e.target.textContent;
    getWeather();

})

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
