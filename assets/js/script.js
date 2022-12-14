// hooks to dom
var searchEl = document.getElementById('site-search')
var searchBtnEl = document.getElementById('searchbtn')
var futureContainerEl = document.getElementById('nextFiveDays')
var currentContainerEl = document.getElementById('container1')
var searchHistoryEl = document.getElementById('searchHistory')




let iconurl = ''



// declare variables

let temp = 0
let city = ''
let humidity = ''
let wind = ''
let x = 0



searchBtnEl.addEventListener('click', function(event){
    x = 0
    event.preventDefault()
     handleUserInput()

  });



// function to get past searches from local storage
function init() {


  var storedSearches = JSON.parse(localStorage.getItem("searches"))
  if (storedSearches != null){
   var arrSearches = storedSearches;
   displayPastSearches(arrSearches);
  }

}
function displayPastSearches(arrSearches){

  for (let i = 0; i <arrSearches.length; i ++){
    let curSearch = arrSearches[i];
    let btn = document.createElement("button");
    btn.setAttribute("class","searchHistoryBtn");
    btn.textContent = curSearch;
    searchHistoryEl.appendchild(btn);

  }
// keep passing arrsearches here
}

function addSearchesLocalStor(cityName, arrSearches){
  arrSearches.push(cityName)
  localStorage.setItem("searches"), JSON.stringify(arrSearches)

}

function handleUserInput(){

  var cityName = searchEl.value;
  getLatAndLon(cityName);
  addSearchesLocalStor(cityName);
}

// API

function getLatAndLon(cityName) {
    // event.preventDefault();
    

    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=59453b64a7a2e400a8acc87cc47e62bc';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          let latitude = data[0].lat;
          let longitude = data[0].lon;
          getApi(latitude, longitude)
          getCurrentWeather(latitude, longitude)
          setLocalStorage(cityName)
        });

    }
    // function to get future weather data
    function getApi(latitude, longitude) { 

      // containerEl.textContent = ''
      futureContainerEl.textContent = ''
        console.log('lat' + latitude + 'lon' + longitude)

        let nextUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude +'&lon=' + longitude + '&appid=59453b64a7a2e400a8acc87cc47e62bc&units=imperial';
      fetch(nextUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        for (var i = 0; i < data.list.length; i = i + 8) {

          var containerEl = document.createElement('div')
          let dateEl = document.createElement('h3');
          let tempEl = document.createElement('p');
          let windEl = document.createElement('p');
          let humidityEl = document.createElement('p');
          let iconEl = document.createElement('img')
          
        temp = data.list[i].main.temp;
        iconcode = data.list[i].weather[0].icon;

        console.log(data);
        date = data.list[i].dt_txt;
        date = moment(date).format('MMMM Do YYYY')
        wind = data.list[i].wind.speed;
        humidity = data.list[i].main.humidity;

    //     //Setting the text of the h3 element and p element.
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    // iconCollection[x].src = iconurl
        iconEl.src = iconurl
        dateEl.textContent = date;
        tempEl.textContent = 'Temp: ' + temp + '??F';
        windEl.textContent = 'Wind: ' + wind + 'MPH';
        humidityEl.textContent = 'Humidity: ' + humidity + '%';
        containerEl.setAttribute('class','containers')
        containerEl.append(dateEl, iconEl, tempEl, windEl, humidityEl);
        futureContainerEl.append(containerEl);
    
        }
    });

    }
    function getCurrentWeather(latitude, longitude) { 
      var curContainerEl = document.createElement('div')
      var cityNameEl = document.createElement('h3')
      var curTempEl = document.createElement('p')
      var curWindEl = document.createElement('p')
      var curHumidityEl = document.createElement('p')
      var curIconEl = document.createElement('img')
      curContainerEl.textContent = ''
      currentContainerEl.textContent = ''
        // console.log('lat' + latitude + 'lon' + longitude)

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
        iconcode = data.weather[0].icon;
        var curIconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        console.log(iconurl)
        cityNameEl.textContent = city
        curTempEl.textContent = 'Temp: ' + temp + '??F';
        curHumidityEl.textContent = 'Humidity: ' + humidity + '%';
        curWindEl.textContent = 'Wind: ' + wind + ' MPH';
        curIconEl.src = curIconurl
        curContainerEl.setAttribute('class','containers')
        curContainerEl.append(cityNameEl, curIconEl, curTempEl, curWindEl, curHumidityEl);
        currentContainerEl.append(curContainerEl);
        
    });

    }

    function setLocalStorage(cityName){
      init();
      //if search button doesn't exist already

      var storageContainerEl = document.createElement('div')
      let storageButtonEl = document.createElement('button');
      storageButtonEl.setAttribute('class','searchHistoryBtn')
      storageButtonEl.textContent = cityName
      storageContainerEl.append(storageButtonEl)
      searchHistoryEl.append(storageContainerEl)


      
    }

    searchHistoryEl.addEventListener('click',function(event){
      var element = event.target
      if(element.matches(".searchHistoryBtn")){
        var name = element.textContent
        getLatAndLon(name);
      }

    })



    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}



