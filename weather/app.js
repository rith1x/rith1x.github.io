
function authDomain() {
  fetch("https://api.jsonbin.io/v3/b/64c099379d312622a3850298?meta=false ")
  .then(response => response.json())
  .then(data => {
    authGet = data;
    const authKey = authGet.weathrApp;
    const yourKey = "iGeiDOmqtygYGit";
    const authApi = authKey.key;
    if (authApi === yourKey && authKey.service === "true"){
      console.log("Authenticated Successfully");
      localStorage.setItem('location','Salem');
      getWeather()
    }
    else{
      document.body.innerHTML = '';
      document.body.innerHTML = '<h1>Authentication Unsuccessful, Contact Developer!</h1>';
    }
  });
}
authDomain();


  function fetchWeather(theURL) {
    fetch(theURL)
      .then(response => response.json())
      .then(data => {
        weather = data;
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
        const location = localStorage.getItem('location');
        const d3tem = weather.weather[2].avgtempC;


        document.getElementById('location').textContent = location;
        document.getElementById('tem1').innerHTML = d1tem + '<sup>°C</sup>';
        document.getElementById('d1min').innerHTML = d1min + '<sup>°C</sup>';
        document.getElementById('d1max').innerHTML = d1max + '<sup>°C</sup>';
        document.getElementById('d1d').textContent = "Today";

        document.getElementById('d2min').innerHTML = d2min + '<sup>°C</sup>';
        document.getElementById('d2max').innerHTML = d2max + '<sup>°C</sup>';
        document.getElementById('d2d').textContent = "Tomorrow";
        document.getElementById('tem2').innerHTML = d1tem + '<sup>°C</sup>';

        document.getElementById('d3min').innerHTML = d3min + '<sup>°C</sup>';
        document.getElementById('d3max').innerHTML = d3max + '<sup>°C</sup>';
        document.getElementById('d3d').textContent = "Overmorrow";
        document.getElementById('tem3').innerHTML = d1tem + '<sup>°C</sup>';


        document.getElementById('pressure').textContent = pressure + ' mbar';
        document.getElementById('moonphase').textContent = moonphase;
        document.getElementById('humidity').textContent = humidity;
        document.getElementById('cloudcover').textContent = cloudcover ;
        document.getElementById('winspeed').innerHTML = winspeed + " Kmph";

        document.getElementById('windeg').style.rotate = windir+'deg';
        document.getElementById('weee').textContent = weee;
        minmax = maxt+ '<sup>°C</sup>' + '/' + mint + '<sup>°C</sup>' ;
        document.getElementById('minmax').innerHTML = minmax;
        document.getElementById('feels').innerHTML = '<p>Feels like ' + feelLike + '<sup>°C</sup></p>';
        const distemp = document.getElementById('weacel');
        distemp.innerHTML = avgtempC + '<sup>°C</sup>';
    });
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
  localStorage.setItem('location',locationip);
  getWeather();
}
