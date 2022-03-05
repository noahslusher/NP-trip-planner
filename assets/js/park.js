var nationalParks = {
  AL: ["Denali National Park | dena", "Gates of the Arctic National Park | gaar", "Glacier Bay National Park | glba", "Katmai National Park | katm", "Kenai Fjords National Park | kefj", "Kobuk Valley National Park | kova", "Lake Clark National Park | lacl", "Wrangell-St. Elias National Park | wrst"],
  AK: [],
  AZ: ["Grand Canyon National Park | grca", "Petrified Forest National Park | pefo", "Saguaro National Park | sagu"],
  AR: ["Hot Springs National Park | hosp"],
  CA: ["Channel Islands National Park |chis", "Death Valley National Park | deva", "Joshua Tree National Park | jotr", "Kings Canyon National Park | kica", "Lassen Volcanic National Park | lavo", "Redwood National Park | redw", "Sequoia National Park | sequ", "Yosemite National Park | yose"],
  CO: ["Black Canyon of the Gunnison National Park | blca", "Great Sand Dunes National Park | grsa", "Mesa Verde National Park | meve", "Rocky Mountain National Park | romo"],
  CT: [],
  DE: [],
  FL: ["Biscayne National Park | bisc", "Dry Tortugas National Park | drto", "Everglades National Park | ever"],
  GA: [],
  HI: ["Haleakala National Park | hale", "Hawaii Volcanoes National Park | havo"],
  ID: ["Yellowstone National Park | yell"],
  IL: [],
  IN: [],
  IA: [],
  KS: [],
  KY: ["Mammoth Cave National Park | maca"],
  LA: [],
  ME: ["Acadia National Park | acad"],
  MD: [],
  MA: [],
  MI: ["Isle Royale National Park | isro"],
  MN: ["Voyageurs National Park | voya"],
  MS: [],
  MO: [],
  MT: ["Glacier National Park | glac", "Yellowstone National Park | yell"],
  NE: [],
  NV: ["Great Basin National Park | grba"],
  NH: [],
  NJ: [],
  NM: ["Carlsbad Caverns National Park | caca"],
  NY: [],
  NC: ["Great Smoky Mountains National Park | grsm"],
  ND: ["Theodore Roosevelt National Park | thro"],
  OH: ["Cuyahoga Valley National Park | cuya"],
  OK: [],
  OR: ["Crater Lake National Park | crla"],
  PA: [],
  RI: [],
  SC: ["Congaree National Park | cong"],
  SD: ["Badlands National Park | badl", "Wind Cave National Park | wica"],
  TN: ["Great Smoky Mountains National Park | grsm"],
  TX: ["Big Bend National Park | bibe", "Guadalupe Mountains National Park | gumo"],
  UT: ["Arches National Park | arch", "Bryce Canyon National Park | brca", "Canyonlands National Park | cany", "Capitol Reef National Park | care", "Zion National Park | zion"],
  VT: [],
  VA: ["Shenandoah National Park | shen"],
  WA: ["Mount Rainier National Park | mora", "North Cascades National Park | noca", "Olympic National Park | olym"],
  WV: [],
  WI: [],
  WY: ["Grand Teton National Park | grte", "Yellowstone National Park | yell"],
};


//added users input to console
$(function() {
    $("#datepicker").datepicker();
    $("#datepicker").on("change",function(){
        var selected = $(this).val();
        console.log(selected);
    });
});
var planMyTrip = document.getElementById('submit-btn')
var userInput = function() {
var select = document.getElementById('userState');
var value = select.options[select.selectedIndex].value;
console.log(value);
}

planMyTrip.addEventListener('click', userInput)

var getState = "UT";
var getDate = new Date();
var parkList = nationalParks[getState];

function createParkSection() {
  // create park section according to the parkCodeList.length
  for (let i = 0; i < 3; i++) {
    $(".park-list").append($("#template").clone().attr("id", ""));
  }
  $("#template").remove();
}
createParkSection();

for (let i = 0; i < 3; i++) {
  var parkName = parkList[i].split("|")[0].trim();
  var parkDiv = $(".park").eq(i);
  var parkCode = parkList[i].split("|")[1].trim();
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
      alt: parkName,
    });
  // google api: put in google map
  $(parkDiv)
    .find(".park-map")
    .html('<iframe style="border: 0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCueXEoU9lnKGoZ8uawRHGyV8tjNV9C_Sg&q=' + parkName + '"></iframe>');
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
  // var promise2 = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=028a37f5d8559aab5b5649bf9e5dc203");

  promise2
    .then((response) => {
      // console.log(promise2);
      return response.json();
    })
    .then((result) => {
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
  //disabled when button is in saving ProcessingInstruction
  if ($(".generateBtn").hasClass("generateBtn-save")) {
    return;
  }

  //disabled if current plan is displaying
  if ($(".currentPlan").hasClass("currentPlan-active")) {
    return;
  }

  $(".generateBtn").addClass("generateBtn-update");
  if (!localStorage.getItem("tripPlan")) {
    $(".generateBtn").text("Save Your Trip");
  } else {
    $(".generateBtn").text("Update Your Trip");
  }

  $(this).toggleClass("active");

  if ($(".generateBtn").text() === "Update Your Trip" && $(".active").length === 0) {
    $(".generateBtn").removeClass("generateBtn-update").text("View Your Trip");
  }
});

// generate the trip
$(".generateBtn").on("click", function () {
  if ($(".generateBtn").text() === "Create Your First Trip") {
    $(".currentPlan").addClass("currentPlan-active");
    $(".currentPlan").append("<div><p class='plan-date'>" + "To generate your first trip, please select the dates you would like to visit. " + "</p></div>");
    return;
  }

  // when the button text is "View Your Trip", show the trip plan
  if ($(".generateBtn").text() === "View Your Trip") {
    loadTrip();
    $(".currentPlan").addClass("currentPlan-active");

    return;
  }

  if ($(".generateBtn").text() === "Save Your Trip" || $(".generateBtn").text() === "Update Your Trip") {
    // save to localstorage
    itinerary = {
      day1: [],
      day2: [],
      day3: [],
      day4: [],
      day5: [],
      day6: [],
      day7: [],
    };
    $(".active").each(function () {
      var dayIndex = $(this).index() + 1;
      var parkName = $(this).closest(".park").find("h2").text().split(".")[1].trim();
      var parkWeather = $(this).find("img").attr("alt").split(" ")[0];
      itinerary["day" + dayIndex].push(parkName + "|" + parkWeather);
    });
    localStorage.setItem("tripPlan", JSON.stringify(itinerary));

    $(".generateBtn").removeClass("generateBtn-update").addClass("generateBtn-save").text("Trip Saved");

    setTimeout(function () {
      $(".generateBtn").removeClass("generateBtn-save").text("View Your Trip");
    }, 800);
  }
});

// load the trip plan from localstorage
function loadTrip() {
  if (!localStorage.getItem("tripPlan")) {
    $(".generateBtn").text("Create Your First Trip");
    return;
  }
  var savedTrip = JSON.parse(localStorage.getItem("tripPlan"));
  $(".currentPlan>div").remove();
  for (let i = 1; i <= 7; i++) {
    if (savedTrip["day" + i].length !== 0) {
      var tripDate = displayDate(i);
      var tripLocations = savedTrip["day" + i];

      $(".currentPlan").append("<div><p class='plan-date'>" + tripDate + "</p></div>");

      console.log(tripLocations);

      $.each(tripLocations, function (index, el) {
        var location = el.split("|")[0].trim();
        console.log(location);
        var weather = el.split("|")[1].trim();

        $(".currentPlan>div:last-child").append("<p class='plan-site'>" + location + " <img src='./assets/icons/" + weather + ".svg' alt='" + weather + "'/></p>");

        console.log(weather);
      });
    }
  }

  // if no plan exist, button shows "crete your trip"
  if (!localStorage.getItem("tripPlan")) {
    $(".generateBtn").text("Create Your First Plan");
  }
}

$(".cross").on("click", function () {
  $(".currentPlan").removeClass("currentPlan-active");
});

loadTrip();
