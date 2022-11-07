// hooks to dom
var searchEl = document.getElementById('site-search')
var searchBtnEl = document.getElementById('searchbtn')
let latitude = ''
let longitude = ''
let temp = 0

// API

function getLatAndLon() {
    event.preventDefault();
    

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

    function getApi() { 
        console.log('lat' + latitude + 'lon' + longitude)

        let nextUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude +'&lon=' + longitude + '&appid=59453b64a7a2e400a8acc87cc47e62bc';
      fetch(nextUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        temp = data.list[0].main.temp;
        temp = Math.trunc((1.8 * (temp - 273) + 32));
        console.log(data);
        date = data.list[0].dt_txt;
        date = moment(date).format('MMMM Do YYYY')
        wind = data.list[0].wind.speed;
        humidity = data.list[0].main.humidity;
        console.log(temp + 'w' + wind + 'h' + humidity + 'd' + date);
    });

    }


  searchBtnEl.addEventListener('click', function(){
    getLatAndLon();
    getApi();

  });
