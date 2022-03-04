var nationalParks = {
  AL: ["Denali National Park", "Gates of the Arctic National Park", "Glacier Bay National Park", "Katmai National Park", "Kenai Fjords National Park", "Kobuk Valley National Park", "Lake Clark National Park", "Wrangell-St. Elias National Park"],
  AK: [],
  AZ: ["Grand Canyon National Park", "Petrified Forest National Park", "Saguaro National Park"],
  AR: ["Hot Springs National Park"],
  CA: ["Channel Islands National Park", "Death Valley National Park", "Joshua Tree National Park", "Kings Canyon National Park", "Lassen Volcanic National Park", "Redwood National Park", "Sequoia National Park", "Yosemite National Park"],
  CO: ["Black Canyon of the Gunnison National Park", "Great Sand Dunes National Park", "Mesa Verde National Park", "Rocky Mountain National Park"],
  CT: [],
  DE: [],
  FL: ["Biscayne National Park", "Dry Tortugas National Park", "Everglades National Park"],
  GA: [],
  HI: ["Haleakala National Park", "Hawaii Volcanoes National Park"],
  ID: ["Yellowstone National Park"],
  IL: [],
  IN: [],
  IA: [],
  KS: [],
  KY: ["Mammoth Cave National Park"],
  LA: [],
  ME: ["Acadia National Park"],
  MD: [],
  MA: [],
  MI: ["Isle Royale National Park"],
  MN: ["Voyageurs National Park"],
  MS: [],
  MO: [],
  MT: ["Glacier National Park", "Yellowstone National Park"],
  NE: [],
  NV: ["Great Basin National Park"],
  NH: [],
  NJ: [],
  NM: ["Carlsbad Caverns National Park"],
  NY: [],
  NC: ["Great Smoky Mountains National Park"],
  ND: ["Theodore Roosevelt National Park"],
  OH: ["Cuyahoga Valley National Park"],
  OK: [],
  OR: ["Crater Lake National Park"],
  PA: [],
  RI: [],
  SC: ["Congaree National Park"],
  SD: ["Badlands National Park", "Wind Cave National Park"],
  TN: ["Great Smoky Mountains National Park"],
  TX: ["Big Bend National Park", "Guadalupe Mountains National Park"],
  UT: ["Arches National Park", "Bryce Canyon National Park", "Canyonlands National Park", "Capitol Reef National Park", "Zion National Park"],
  VT: [],
  VA: ["Shenandoah National Park"],
  WA: ["Mount Rainier National Park", "North Cascades National Park", "Olympic National Park"],
  WV: [],
  WI: [],
  WY: ["Grand Teton National Park", "Yellowstone National Park"],
};

var getState = "UT";
var getDate = new Date();
var parkList = nationalParks[getState];
var parkCodeList = ["arch", "brca", "cany", "care", "zion"];

function createParkSection() {
  // create park section according to the parkCodeList.length
  for (let i = 0; i < 2; i++) {
    $(".park-list").append($("#template").clone().attr("id", ""));
  }
  $("#template").remove();
}
createParkSection();

for (let i = 0; i < parkList.length; i++) {
  var parkName = parkList[i];
  var parkDiv = $(".park").eq(i);
  var parkCode = parkCodeList[i];
  // put in name
  $(parkDiv)
    .find("h2")
    .text(i + 1 + ". " + parkName);
  // NP api

  //put in park website
  $(parkDiv)
    .find(".website a")
    .text("Official Website")
    .attr({
      href: "https://www.nps.gov/" + parkCode + "/index.htm",
      target: "_blank",
    });

  // put in image
  $(parkDiv)
    .find(".park-image img")
    .attr({
      src: "./assets/images/" + parkCode + ".jpg",
      alt: "parkName",
    });
  // google api: put in google map
  $(parkDiv).find(".park-map").html('<iframe style="border: 0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCueXEoU9lnKGoZ8uawRHGyV8tjNV9C_Sg&q=' + parkName + '"></iframe>');
  // open weather api: put in weather info
  $(parkDiv).find(".weather-row");
  getGeo(parkName, i);
}

function getGeo(parkName, i) {
  // get national park's geo info
  var promise = fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + parkName + "&key=AIzaSyCueXEoU9lnKGoZ8uawRHGyV8tjNV9C_Sg");

  promise
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((result) => {
      // console.log(result);

      var lat = result.results[0].geometry.location.lat;
      var lon = result.results[0].geometry.location.lng;

      getWeather(lat, lon, i);
    })
    .catch((error) => {
      console.log("geo-api connect error", error);
    });
}

// datepicker
$( function() {
  $( "#datepicker" ).datepicker().addClass("font-color: blue");
    minDate: 1
} );


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
  var promise2 = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=07fbc9932f3a4d5f19df3aa5907fbbb2");

  promise2
    .then((response) => {
      // console.log(promise2);
      return response.json();
    })
    .then((result) => {
      // display current weather
      var currentData = [result.current.temp, result.current.wind_speed, result.current.humidity, result.current.uvi.toFixed(2)];
      var currentWeather = result.current.weather[0].main.toLowerCase();

      //display future weather
      for (let i = 0; i < 7; i++) {
        var futureData = [result.daily[i].temp.day, result.daily[i].wind_speed, result.daily[i].humidity];
        var futureWeather = result.daily[i].weather[0].main.toLowerCase();

        displayFuture(futureData, i, futureWeather, divIndex);
      }
    })
    .catch((error) => console.log("weather-api connect error", error));
}

// click the date and add active status
$(".weather-row").on("click", "div", function () {
  console.log("clicked");
  $(this).toggleClass("active");
  $(".generateBtn").addClass("generateBtn-active");
});

var itinerary = {
  day1: [],
  day2: [],
  day3: [],
  day4: [],
  day5: [],
  day6: [],
  day7: [],
};

// generate the trip
$(".generateBtn").on("click", function () {
  console.log($(".active").length);
  $(".active").each(function () {
    var dayIndex = $(this).index() + 1;
    var parkName = $(this).closest(".park").find("h2").text().split(".")[1].trim();
    var parkWeather = $(this).find("img").attr("alt").split(" ")[0];

    itinerary["day" + dayIndex].push(parkName + "|" + parkWeather);
  });

  localStorage.setItem("tripPlan", JSON.stringify(itinerary));
});

// load the tripplan from localstorage
function loadTrip() {
  var savedTrip = JSON.parse(localStorage.getItem("tripPlan"));
  for (let i = 1; i <= 7; i++) {
    if (savedTrip["day" + i].length !== 0) {
      var tripDate = displayDate(i);
      var tripLocations = savedTrip["day" + i];

      $(".brief-intro").append("<div><p class='plan-date'>" + tripDate + "</p></div>");

      console.log(tripLocations);

      $.each(tripLocations, function (index, el) {
        var location = el.split("|")[0].trim();
        console.log(location);
        var weather = el.split("|")[1].trim();

        $(".brief-intro>div:last-child").append("<p class='plan-site'>" + location + "<img src='./assets/icons/" + weather + ".svg' alt='" + weather + "'/></p>");

        console.log(weather);
      });
    }
  }
}

