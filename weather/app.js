
const moonobj = {
  "new moon": "🌑",
  "waxing crescent": "🌒",
  "first quarter": "🌓",
  "waxing gibbous": "🌔",
  "full moon": "🌕",
  "waning gibbous": "🌖",
  "last quarter": "🌗",
  "waning crescent": "🌘"
}





function fetchWeather(theURL) {
  fetch(theURL)
    .then(response => response.json())
    .then(data => {
      weather = data;
      console.log(weather)
      const avgtempC = weather.current_condition[0].temp_C;
      const maxt = weather.weather[0].maxtempC;
      const mint = weather.weather[0].mintempC;
      const feelLike = weather.current_condition[0].FeelsLikeC;
      const weee = weather.current_condition[0].weatherDesc[0].value;
      const humidity = weather.current_condition[0].humidity;
      const cloudcover = weather.current_condition[0].cloudcover;
      const windir = weather.current_condition[0].winddirDegree;
      const winspeed = weather.current_condition[0].windspeedKmph;
      const moonphase = weather.weather[0].astronomy[0].moon_phase;
      const pressure = weather.current_condition[0].pressure;
      const d1min = weather.weather[0].mintempC;
      const d1max = weather.weather[0].maxtempC;
      const d1tem = weather.weather[0].avgtempC;
      const d2min = weather.weather[1].mintempC;
      const d2max = weather.weather[1].maxtempC;
      const d2tem = weather.weather[1].avgtempC;
      const d3min = weather.weather[2].mintempC;
      const d3max = weather.weather[2].maxtempC;
      const lat = weather.nearest_area[0].latitude
      const lon = weather.nearest_area[0].longitude
      console.log(lat, lon)
      document.getElementById('mapview').src = `https://maps.google.com/maps?q=${lat}, ${lon}&z=12&output=embed`
      const location = weather.nearest_area[0].areaName[0].value;
      const d3tem = weather.weather[2].avgtempC;
      const sunrise = weather.weather[0].astronomy[0].sunrise;
      const sunset = weather.weather[0].astronomy[0].sunset;
      const moonrise = weather.weather[0].astronomy[0].moonrise;
      const moonset = weather.weather[0].astronomy[0].moonset;

      document.getElementById('sunrise').textContent = sunrise;
      document.getElementById('sunset').textContent = sunset;
      document.getElementById('moonrise').textContent = moonrise;
      document.getElementById('moonset').textContent = moonset;
      document.getElementById('sunhrs').innerText = weather.weather[0].sunHour + " Hours"
      document.getElementById('location').textContent = location;
      document.getElementById('tem1').innerHTML = d1tem + '<sup>°C</sup>';
      document.getElementById('d1min').innerHTML = d1min + '<sup>°C</sup>';
      document.getElementById('d1max').innerHTML = d1max + '<sup>°C</sup>';
      document.getElementById('d1d').textContent = "Today";
      document.getElementById('d2min').innerHTML = d2min + '<sup>°C</sup>';
      document.getElementById('d2max').innerHTML = d2max + '<sup>°C</sup>';
      document.getElementById('d2d').textContent = "Tomorrow";
      document.getElementById('tem2').innerHTML = d2tem + '<sup>°C</sup>';
      document.getElementById('d3min').innerHTML = d3min + '<sup>°C</sup>';
      document.getElementById('d3max').innerHTML = d3max + '<sup>°C</sup>';
      document.getElementById('d3d').textContent = "Overmorrow";
      document.getElementById('tem3').innerHTML = d3tem + '<sup>°C</sup>';
      document.getElementById('pressure').textContent = pressure + ' mbar';
      document.getElementById('moonphase').textContent = moonphase;
      document.getElementById('moonillum').innerHTML = `<span id="mph">${moonobj[(moonphase.toLowerCase())]}</span> ` + weather.weather[0].astronomy[0].moon_illumination + "%";
      document.getElementById('mph').style.opacity = "0." + weather.weather[0].astronomy[0].moon_illumination;
      document.getElementById('humidity').textContent = humidity + '%';
      document.getElementById('cloudcover').textContent = cloudcover + '%';
      document.getElementById('winspeed').innerHTML = winspeed + " km/h";
      document.getElementById('windeg').style.rotate = windir + 'deg'; // 
      document.getElementById('weee').textContent = weee;
      minmax = maxt + '<sup>°C</sup>' + '/' + mint + '<sup>°C</sup>';
      document.getElementById('minmax').innerHTML = minmax;
      document.getElementById('feels').innerHTML = '<p>Feels like ' + feelLike + '<sup>°C</sup></p>';
      const distemp = document.getElementById('weacel');

      let uvtag = "";
      let uvc = '';

      const uvi = weather.current_condition[0].uvIndex
      if (uvi >= 0 && uvi < 3) {
        uvtag = "SAFE"
        uvc = 1
      } else if (uvi >= 3 && uvi < 6) {
        uvtag = "MODERATE"
        uvc = 2
      } else if (uvi >= 6 && uvi < 8) {
        uvtag = "HIGH"
        uvc = 3
      } else if (uvi >= 8 && uvi < 11) {
        uvtag = "VERY HIGH"
        uvc = 4
      } else {
        uvtag = "EXTREME"
        uvc = 5
      }
      document.getElementById("lut").innerText = "Observed at " + weather.current_condition[0].localObsDateTime

      document.getElementById('uvi').innerHTML = `${weather.current_condition[0].uvIndex} <span class="${"u" + uvc} uvt">${uvtag}</span>`
      distemp.innerHTML = avgtempC + '<sup>°C</sup>';
      var wcd = weather.current_condition[0].weatherCode;
      const wemg = document.getElementById('wemg');

      function boxBgchange() {
        const hourss = new Date().getHours();
        const chkdns = hourss > 6 && hourss < 18;
        if (chkdns === true) {
          document.body.style.backgroundImage = "linear-gradient(315deg, #045de9 0%, #09c6f9 74%)";

        } else {
          document.body.style.backgroundImage = "linear-gradient(315deg, #6050dc 0%, #000080 94%)";
          boxbg = "img/ncloudy.svg";
        }
      }
      boxBgchange();

      function getimgSrc() {
        if (wcd == 116 || wcd == 119) {
          const hours = new Date().getHours();
          const chkdn = hours > 6 && hours < 20;
          if (chkdn === true) {
            ;
            wemg.src = "img/dcloudy.svg";
          } else {
            wemg.src = "img/ncloudy.svg";
          }
        } else if (wcd == 200 || wcd == 386 || wcd == 389 || wcd == 392 || wcd == 395) {
          wemg.src = "img/thunder.svg";
        } else if (wcd == 371 || wcd == 338 || wcd == 332 || wcd == 329 || wcd == 335 || wcd == 230) {
          wemg.src = "img/snow3.svg";
        } else if (wcd == 179 || wcd == 182 || wcd == 185 || wcd == 227 || wcd == 281 || wcd == 284 || wcd == 311 || wcd == 314 || wcd == 317 || wcd == 320 || wcd == 323 || wcd == 326 || wcd == 350 || wcd == 362 || wcd == 365 || wcd == 368 || wcd == 374 || wcd == 377) {
          wemg.src = "img/snow2.svg";
        } else if (wcd == 359 || wcd == 356 || wcd == 308 || wcd == 302 || wcd == 305 || wcd == 299) {
          wemg.src = "img/rain3.svg";
        } else if (wcd == 263 || wcd == 266 || wcd == 293 || wcd == 296 || wcd == 353 || wcd == 176) {
          wemg.src = "img/rain2.svg";
        } else if (wcd == 122) {
          wemg.src = "img/cloudy.svg";
        } else if (wcd == 113) {

          const hours = new Date().getHours();
          const chkdn = hours > 6 && hours < 20;
          if (chkdn === true) {

            wemg.src = "img/sun.svg";
          } else {
            wemg.src = "img/ncloudy.svg";
          }

        } else {
          wemg.src = "img/cloudy.svg";
        }
      }
      getimgSrc();
    })
}
function getWeather() {
  const baseUrl = "https://wttr.in/";
  const location = localStorage.getItem('location');
  const mode = '?format=j2';
  theURL = baseUrl + location + mode;
  fetchWeather(theURL)
}
function fetchloc() {
  const locationip = document.getElementById('city').value;
  localStorage.setItem('location', locationip);
  getWeather();
}
localStorage.setItem('location', 'Salem,Tamilnadu');
getWeather();


document.addEventListener('keypress', (Event) => {
  if (Event.key === 'Enter') {
    document.getElementById('location').textContent = "Please Wait!";

    fetchloc();
  }
})
let mode = 0
function toggleMode() {
  if (mode == 0) {
    mode = 1;
    document.body.className = "dark"
    document.getElementById('modes').innerText = "Toggle Light Mode"
  } else {
    mode = 0;
    document.body.className = "light"
    document.getElementById('modes').innerText = "Toggle Dark Mode"

  }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   