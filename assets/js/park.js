var nationalParks = {
  UT: ["Arches National Park", "Capitol Reef National Park", "Bryce Canyon National Park"],
  // UT: ["Arches National Park"],
  CA: [],
  FL: [],
};

var getState = "UT";
var getDate = "state";
var parkList = nationalParks[getState];
var parkCodeList = ["arch", "care", "brca"];

function createParkSection() {
  // remove all the park section if there is no park in the states
  if (parkList.length === 0) {
    $(".park").remove();
    return false;
  }
  // create park section according to the parkCodeList.length
  for (let i = 0; i < parkList.length - 1; i++) {
    $(".park-list").append($(".park[data-num='1']").clone().attr("data-num", i));
  }
}
createParkSection();

for (let i = 0; i < parkList.length; i++) {
  var parkName = parkList[i];
  var parkDiv = $(".park-list>div").eq(i);
  var parkCode = "arch";
  // put in name
  $(parkDiv).find("h2").text(parkName);
  // put in image
  $(parkDiv)
    .find(".park-image img")
    .attr({
      src: "./assets/images/" + parkCodeList[i] + ".jpg",
      alt: "parkName",
    });
  // put in google map
  $(parkDiv)
    .find(".park-map")
    .html('<iframe style="border: 0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCueXEoU9lnKGoZ8uawRHGyV8tjNV9C_Sg&q=' + parkName + '"></iframe>');
  // put in weather info
  $(parkDiv).find(".weather-row");
  getGeo(parkName, i);
}

function getGeo(parkName, i) {
  // get national park's geo info
  var promise = fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + parkName + "&key=AIzaSyCueXEoU9lnKGoZ8uawRHGyV8tjNV9C_Sg");
  console.log(promise);
  promise
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((result) => {
      // console.log(result);

      var lat = result.results[0].geometry.location.lat;
      var lon = result.results[0].geometry.location.lng;
      console.log("lat" + lat);
      console.log("lon" + lon);
      getWeather(lat, lon, i);
    })
    .catch((error) => {
      console.log(promise);
      console.log("geo-api connect error", error);
    });
}

// return future date according to tomorrow(i=1), the day after tomorrow(i=2) ,etc
function displayDate(i) {
  var date = new Date();
  date = date.setDate(date.getDate() + i);
  date = new Date(date);
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

// put in weather data
function displayFuture(data, i, weather, divIndex) {
  var weatherRow = $(".park").eq(divIndex).find(".weather-row");
  // display date
  $(weatherRow)
    .children("div")
    .eq(i)
    .find("p")
    .text(displayDate(i + 1));

  //display weather condition icon
  $(weatherRow)
    .children("div")
    .eq(i)
    .find("img")
    .attr({
      src: "./assets/icons/" + weather + ".svg",
      alt: weather + " weather icon",
    });

  // display weather data
  $(weatherRow)
    .children("div")
    .eq(i)
    .find("span")
    .each(function (index, el) {
      $(this).text(data[index]);
    });
}

// get weather info
function getWeather(lat, lon, divIndex) {
  var promise2 = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=a4c6121f0370419f31df40933c07c49f");

  promise2
    .then((response) => {
      // console.log(promise2);
      return response.json();
    })
    .then((result) => {
      // console.log("weather api result:");
      console.log(result);
      // display current weather
      var currentData = [result.current.temp, result.current.wind_speed, result.current.humidity, result.current.uvi.toFixed(2)];
      var currentWeather = result.current.weather[0].main.toLowerCase();

      //display future weather
      for (let i = 0; i < 7; i++) {
        var futureData = [result.daily[i].temp.day, result.daily[i].wind_speed, result.daily[i].humidity];
        var futureWeather = result.daily[i].weather[0].main.toLowerCase();
        console.log(futureData);

        displayFuture(futureData, i, futureWeather, divIndex);
      }
    })
    .catch((error) => console.log("weather-api connect error", error));
}

// click the date and add active status
$(".weather-row").on("click", "div", function () {
  console.log("clicked");
  $(this).toggleClass("active");
});
