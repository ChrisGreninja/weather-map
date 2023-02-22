let lat;
let lon;
let temp;

function fetchVal(result) {
  console.log(result);
  document.getElementById("temp").innerHTML =
    result.main.temp + "<sup>o</sup> C";
  document.getElementById("minTemp").innerHTML =
    result.main.temp_min + "<sup>o</sup> C";
  document.getElementById("maxTemp").innerHTML =
    result.main.temp_max + "<sup>o</sup> C";

  const imageURL =
    "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";
  document.getElementById("Icon").setAttribute("src", imageURL);
  document.getElementById("description").innerText =
    result.weather[0].description;
  document.getElementById("windSpeed").innerText =
    "wind speed: " + result.wind.speed + "kmph";
  document.getElementById("loctionName").innerText = result.name;
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    console.log(lat, lon);
    let fetchResult = fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=d138353ade952c62f7ac88388b24f148&units=metric"
    );
    // fetchRes is the promise to resolve
    // it by using.then() method
    fetchResult
      .then((res) => res.json())
      .then((data) => {
        fetchVal(data);
      });
  });
}

function setVal() {
  var lat = document.getElementById("lat1").value;
  var lon = document.getElementById("lon1").value;

  let fetchResult = fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=d138353ade952c62f7ac88388b24f148&units=metric"
  );
  // fetchRes is the promise to resolve
  // it by using.then() method
  fetchResult
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetchVal(data);
    });
}
