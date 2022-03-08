var nationalParks = {
  AL: ["Denali National Park | dena", "Gates of the Arctic National Park | gaar", "Glacier Bay National Park | glba", "Katmai National Park | katm", "Kenai Fjords National Park | kefj", "Kobuk Valley National Park | kova", "Lake Clark National Park | lacl", "Wrangell-St. Elias National Park | wrst"],
  // AK: [],
  AZ: ["Grand Canyon National Park | grca", "Petrified Forest National Park | pefo", "Saguaro National Park | sagu"],
  AR: ["Hot Springs National Park | hosp"],
  CA: ["Channel Islands National Park | chis", "Death Valley National Park | deva", "Joshua Tree National Park | jotr", "Lassen Volcanic National Park | lavo", "Redwood National Park | redw", "Sequoia & Kings Canyon National Park | seki", "Yosemite National Park | yose"],
  CO: ["Black Canyon of the Gunnison National Park | blca", "Great Sand Dunes National Park | grsa", "Mesa Verde National Park | meve", "Rocky Mountain National Park | romo"],
  // CT: [],
  // DE: [],
  FL: ["Biscayne National Park | bisc", "Dry Tortugas National Park | drto", "Everglades National Park | ever"],
  // GA: [],
  HI: ["Haleakala National Park | hale", "Hawaii Volcanoes National Park | havo"],
  ID: ["Yellowstone National Park | yell"],
  // IL: [],
  // IN: [],
  // IA: [],
  // KS: [],
  KY: ["Mammoth Cave National Park | maca"],
  // LA: [],
  ME: ["Acadia National Park | acad"],
  // MD: [],
  // MA: [],
  MI: ["Isle Royale National Park | isro"],
  MN: ["Voyageurs National Park | voya"],
  // MS: [],
  // MO: [],
  MT: ["Glacier National Park | glac", "Yellowstone National Park | yell"],
  // NE: [],
  NV: ["Great Basin National Park | grba"],
  // NH: [],
  // NJ: [],
  NM: ["Carlsbad Caverns National Park | cave"],
  // NY: [],
  NC: ["Great Smoky Mountains National Park | grsm"],
  ND: ["Theodore Roosevelt National Park | thro"],
  OH: ["Cuyahoga Valley National Park | cuva"],
  // OK: [],
  OR: ["Crater Lake National Park | crla"],
  // PA: [],
  // RI: [],
  SC: ["Congaree National Park | cong"],
  SD: ["Badlands National Park | badl", "Wind Cave National Park | wica"],
  TN: ["Great Smoky Mountains National Park | grsm"],
  TX: ["Big Bend National Park | bibe", "Guadalupe Mountains National Park | gumo"],
  UT: ["Arches National Park | arch", "Bryce Canyon National Park | brca", "Canyonlands National Park | cany", "Capitol Reef National Park | care", "Zion National Park | zion"],
  // VT: [],
  VA: ["Shenandoah National Park | shen"],
  WA: ["Mount Rainier National Park | mora", "North Cascades National Park | noca", "Olympic National Park | olym"],
  // WV: [],
  // WI: [],
  WY: ["Grand Teton National Park | grte", "Yellowstone National Park | yell"],
};

//retrieving correct state based on input- defaulting to KY
var url = location.search;
var getDate = url.split("&")[0].split("=")[1];
var getState = url.split("&")[1].split("=")[1];
var parkList = nationalParks[getState];
// create park section according to the parkCodeList.length
createParkSection();
function createParkSection() {
  for (let i = 0; i < parkList.length; i++) {
    $(".park-list").append($("#template").clone().attr("id", ""));
  }
  $("#template").remove();
}

for (let i = 0; i < parkList.length; i++) {
  var parkName = parkList[i].split("|")[0].trim();
  var parkDiv = $(".park").eq(i);
  var parkCode = parkList[i].split("|")[1].trim();
  // put in name
  $(parkDiv)
    .find("h2")
    .text(i + 1 + ". " + parkName);
  // NP api
  getNP(parkCode, i);

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
    .append('<iframe style="border: 0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCueXEoU9lnKGoZ8uawRHGyV8tjNV9C_Sg&q=' + parkName.replace(/&/g, "%26") + "," + getState + '&zoom=7"></iframe>');
  // open weather api: put in weather info
  $(parkDiv).find(".weather-row");
  getGeo(parkName, i);
}

function getGeo(parkName, i) {
  // get national park's geo info
  var promise = fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + parkName.replace(/&/g, "%26") + "&key=AIzaSyCueXEoU9lnKGoZ8uawRHGyV8tjNV9C_Sg");

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

// return future date according to tomorrow(i=1), the day after tomorrow(i=2) ,etc
function displayDate(i) {
  var date = new Date(getDate);
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

// National park api
function getNP(parkCode, i) {
  fetch("https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=0udE9V2GRj3cRahVJ120KpyLcjQ4YXlVgLpPg4RQ")
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((result) => {
      //string data: description
      var description = result.data[0].description.split(".")[0] + ".";
      $(".park-describe").eq(i).text(description);
      //string multiple data: activities
      var activities = "";
      result.data[0].activities.forEach((el, index) => {
        if (index > 5) {
          return;
        }
        activities += el.name + ", ";
        if (index === 5) {
          activities += el.name + ", etc.";
        }
      });
      $(".what-to-expect span").eq(i).text(activities);
      //string data: hours
      var operatingHours = result.data[0].operatingHours[0].description.split(".")[0] + ".";

      $(".hours span").eq(i).text(operatingHours);
      //string multiple data: entrance fees
      feeAndPass();
      function feeAndPass() {
        // if fee is not 0, display fee and pass
        if (parseInt(result.data[0].entranceFees[0].cost) !== 0) {
          var vehicleFee;
          var motorcycleFee;
          var bicycleFee;
          var ticketFee;
          var passFee;

          // exception code - start

          //case: only one type of fee
          switch (parkCode) {
            case "dena":
              ticketFee = 15;
              passFee = 45;
              oneFee();
              oneFeePass();
              return;
            case "cave":
              ticketFee = 15;
              oneFee();
              return;
            case "drto":
              ticketFee = 15;
              oneFee();
              return;
            case "isro":
              ticketFee = 7;
              passFee = 60;
              oneFee();
              oneFeePass();
              return;
            case "gumo":
              ticketFee = 10;
              passFee = 35;
              oneFee();
              oneFeePass();
              return;
          }
          function oneFee() {
            $(".fee").eq(i).find("img, span").hide();
            $(".annual-pass").eq(i).hide();
            $(".fee")
              .eq(i)
              .find("b")
              .after("$" + ticketFee);
          }
          function oneFeePass() {
            $(".annual-pass").eq(i).show().find("span").text(passFee);
          }

          vehicleFee = result.data[0].entranceFees[0].cost.split(".")[0];
          motorcycleFee = result.data[0].entranceFees[1].cost.split(".")[0];
          bicycleFee = result.data[0].entranceFees[2].cost.split(".")[0];
          // case: bike and motor price exchange
          if (motorcycleFee < bicycleFee) {
            var exchange;
            exchange = motorcycleFee;
            motorcycleFee = bicycleFee;
            bicycleFee = exchange;
          }
          // exception code - end

          $(".fee .vehicle")
            .eq(i)
            .text("$" + vehicleFee + "|");

          $(".fee .motorcycle")
            .eq(i)
            .text("$" + motorcycleFee + "|");

          $(".fee .bicycle")
            .eq(i)
            .text("$" + bicycleFee);

          //string data: entrance pass
          var annualPass = result.data[0].entrancePasses[0].cost.split(".")[0];

          $(".annual-pass span").eq(i).text(annualPass);
        } // if fee is 0, hide entranceFee and pass
        else {
          $(".fee").eq(i).find("img, span").hide();

          $(".annual-pass").eq(i).hide();
          // exception code - start
          if ((parkCode = "hosp")) {
            $(".fee").eq(i).find("b").after("Free");
            return;
          }
          // exception code - End
          $(".fee")
            .eq(i)
            .find("b")
            .after(result.data[0].entranceFees[0].description.split(".")[0] + ".");
        }
      }

      //string data: contact phone
      var contactPhone = result.data[0].contacts.phoneNumbers[0].phoneNumber;
      $(".park-contact .tel")
        .eq(i)
        .text(contactPhone)
        .attr("href", "tel:" + contactPhone);
      //string data: contact email
      var contactEmail = result.data[0].contacts.emailAddresses[0].emailAddress;
      $(".park-contact .email")
        .eq(i)
        .text(contactEmail)
        .attr("href", "mailto:" + contactEmail);
    });
}

// get weather info
function getWeather(lat, lon, divIndex) {
  var promise2 = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=07fbc9932f3a4d5f19df3aa5907fbbb2" + "&units=imperial");

  promise2
    .then((response) => {
      console.log(promise2);
      return response.json();
    })
    .then((result) => {
      //display future weather
      for (let i = 0; i <= 7; i++) {
        var futureData = [parseInt(result.daily[i].temp.day), parseInt(result.daily[i].wind_speed), result.daily[i].humidity];
        var futureWeather = result.daily[i].weather[0].main.toLowerCase();

        displayFuture(futureData, i, futureWeather, divIndex);
      }
    })
    .catch((error) => console.log("weather-api connect error", error));
}

// choosing date - hover effect
$(".weather-row div").hover(
  function () {
    if ($(this).hasClass("active")) {
      $(this).addClass("minus");
    } else {
      $(this).addClass("add");
    }
  },
  function () {
    if ($(this).hasClass("add")) {
      $(this).removeClass("add");
    } else if ($(this).hasClass("minus")) {
      $(this).removeClass("minus");
    }
  }
);

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
  // change the color of li
  $(this).toggleClass("active");
  //change the text of button
  $(".generateBtn").addClass("generateBtn-update");

  if (!localStorage.getItem("tripPlan")) {
    if ($(".active").length === 0) {
      $(".generateBtn").removeClass("generateBtn-update").text("Create Your Trip");
    } else {
      $(".generateBtn").text("Save Your Trip");
    }
    return;
  } else {
    $(".generateBtn").text("Update Your Trip");
  }

  if ($(".generateBtn").text() === "Update Your Trip" && $(".active").length === 0) {
    $(".generateBtn").removeClass("generateBtn-update").text("View Your Trip");
  }
});

// generate the trip
$(".generateBtn").on("click", function () {
  if ($(".generateBtn").text() === "Create Your Trip") {
    $(".currentPlan").addClass("currentPlan-active");
    $(".plan-date").remove();
    $(".currentPlan").append("<div><p class='plan-date'>" + "To generate your trip, please select your visiting dates." + "</p></div>");
    // hide the info panel 3 seconds later
    setTimeout(function () {
      $(".currentPlan").removeClass("currentPlan-active");
    }, 3000);
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
  // if no plan exist, button shows "crete your trip"
  if (!localStorage.getItem("tripPlan")) {
    $(".generateBtn").text("Create Your Trip");
    return;
  }
  var savedTrip = JSON.parse(localStorage.getItem("tripPlan"));
  $(".currentPlan>div").remove();
  for (let i = 1; i <= 7; i++) {
    if (savedTrip["day" + i].length !== 0) {
      var tripDate = displayDate(i);
      var tripLocations = savedTrip["day" + i];

      $(".currentPlan").append("<div><p class='plan-date'>" + tripDate + "</p></div>");

      $.each(tripLocations, function (index, el) {
        var location = el.split("|")[0].trim();

        var weather = el.split("|")[1].trim();

        $(".currentPlan>div:last-child").append("<p class='plan-site'>" + location + " <img src='./assets/icons/" + weather + ".svg' alt='" + weather + "'/></p>");
      });
    }
  }
}

// click cross button
$(".cross").on("click", function () {
  $(".currentPlan").removeClass("currentPlan-active");
});

// click trash button
$(".trash").on("click", function () {
  // do nothing if there is no saved data
  if (!localStorage.getItem("tripPlan")) {
    return;
  }
  // remove all the displayed trip info
  $(".currentPlan >div")
    .stop()
    .slideUp(1000, function () {
      $(this).remove();
    });
  // add info
  $(".currentPlan").append("<div><p class='plan-date'>" + "To generate your trip, please select your visiting dates." + "</p></div>");

  // change text of button
  $(".generateBtn").text("Create Your Trip");
  // clear saved data
  localStorage.clear();
  // remove all the actived li
  $(".active").each(function () {
    $(this).removeClass("active");
  });
  // hide the info panel 3 seconds later
  setTimeout(function () {
    $(".currentPlan").removeClass("currentPlan-active");
  }, 3000);
});
loadTrip();
