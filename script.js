let lat;
let lon;
var dataobj;

var zoom = 13;

var map = L.map("map").setView([0, 0], zoom);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/// get current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    let data = getWeatherData(lat, lon, zoom);
  });
}

//// get data
function getWeatherData(lat, lon, zoom) {
  let fetchResult = fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=d138353ade952c62f7ac88388b24f148&units=metric"
  );
  console.log(lat, lon);
  fetchVal(fetchResult, zoom);
}

// fetchRes is the promise to resolve
// it by using.then() method
function fetchVal(fetchResult, zoom1) {
  fetchResult
    .then((res) => res.json())
    .then((data) => {
      dataobj = data;
      sendVal(data);
      map = map.remove();
      mapDec(dataobj.coord.lat, dataobj.coord.lon, zoom1);
      return data;
    });
}

/// apply data
function sendVal(result) {
  document.getElementById("temp").innerHTML =
    result.main.temp + "<sup>o</sup> C";
  document.getElementById("minTemp").innerHTML =
    "Maximum temp: " + result.main.temp_min + "<sup>o</sup> C";
  document.getElementById("maxTemp").innerHTML =
    "Maximum temp: " + result.main.temp_max + "<sup>o</sup> C";
  document.getElementById("latt").innerHTML = "latitude: " + result.coord.lat;
  document.getElementById("long").innerHTML = "longitude: " + result.coord.lon;
  const imageURL =
    "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";
  document.getElementById("Icon").setAttribute("src", imageURL);
  document.getElementById("description").innerText =
    result.weather[0].description;
  document.getElementById("windSpeed").innerText =
    "wind speed: " + result.wind.speed + "kmph";
  document.getElementById("loctionName").innerText = result.name;
}

////map
function mapDec(lat, lon, zoom2) {
  map = L.map("map").setView([lat, lon], zoom2);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup(`<b>${dataobj.name}</b>`).openPopup();
  document.getElementById("map").onwheel = function () {
    zoomVal();
  };
  map.on("click", async function (e) {
    let zooom = zoom;

    const val = getWeatherData(e.latlng.lat, e.latlng.lng, zooom);

    marker.setLatLng([e.latlng.lat, e.latlng.lng]);
  });
}

function zoomVal() {
  zoom = map.getZoom();
}
