// hooks to dom
var searchEl = document.getElementById('site-search')
var searchBtnEl = document.getElementById('searchbtn')
var futureContainerEl = document.getElementById('nextFiveDays')

let dateCollection = []
let tempCollection = []
let windCollection = []
let humidityCollection = []

// declare variables
let latitude = ''
let longitude = ''
let temp = 0
let city = ''
let humidity = ''
let wind = ''
let x = 0

searchBtnEl.addEventListener('click', function(event){
     dateCollection = document.querySelectorAll('.date')
     tempCollection = document.querySelectorAll('.temp')
     windCollection = document.querySelectorAll('.wind')
     humidityCollection = document.querySelectorAll('.humidity')
    event.preventDefault()
    getLatAndLon();
    getApi();
    getCurrentWeather();

  });

// let dateEl = document.createElement('h3');
// let tempEl = document.createElement('p');
// let windEl = document.createElement('p');
// let humidityEl = document.createElement('p');
// let homeScreen = false

// API

function getLatAndLon() {
    // event.preventDefault();
    

    var cityName = searchEl.value
    console.log(cityName)
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=59453b64a7a2e400a8acc87cc47e62bc';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
           latitude = data[0].lat;
           longitude = data[0].lon;
          
        });

    }
    // function to get future weather data
    function getApi() { 
        console.log('lat' + latitude + 'lon' + longitude)

        let nextUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude +'&lon=' + longitude + '&appid=59453b64a7a2e400a8acc87cc47e62bc&units=imperial';
      fetch(nextUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        for (var i = 0; i < data.list.length; i = i + 8) {
        temp = data.list[i].main.temp;
        console.log(data);
        date = data.list[i].dt_txt;
        date = moment(date).format('MMMM Do YYYY')
        wind = data.list[i].wind.speed;
        humidity = data.list[i].main.humidity;
        dateCollection[x].textContent = date;
        tempCollection[x].textContent = temp;
        windCollection[x].textContent = wind;
        humidityCollection[x].textContent = humidity;
        x = x +1;
        



    //     //Setting the text of the h3 element and p element.
    //     dateEl.textContent = date;
    //     tempEl.textContent = 'Temp: ' + temp + '°F';
    //     windEl.textContent = 'Wind: ' + wind + 'MPH';
    //     humidityEl.textContent = 'Humidity: ' + humidity + '%';

    //     if (homeScreen === false){

    //     var containerEl = document.createElement('div')
    //     futureContainerEl.append(containerEl);
    //     containerEl.setAttribute('class','containers')

    //     containerEl.append(dateEl);
    //     containerEl.append(tempEl);
    //     containerEl.append(windEl);
    //     containerEl.append(humidityEl);
    // }
    //     // console.log(temp + 'w' + wind + 'h' + humidity + 'd' + date);
        }
    });

    }
    function getCurrentWeather() { 
        console.log('lat' + latitude + 'lon' + longitude)

        let curWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&lon=' + longitude + '&appid=59453b64a7a2e400a8acc87cc47e62bc&units=imperial';
      fetch(curWeatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        city = data.name;
        temp = data.main.temp;
        humidity = data.main.humidity;
        wind = data.wind.speed;
        console.log('city' + city + 'temp' + temp + 'humidity' + humidity + 'wind' + wind);
        
    });

    }



    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}



