var weatherURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={90fb50fac270c54c352e49a47c6e77fa}"
var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={90fb50fac270c54c352e49a47c6e77fa}"
var npsURL = "https://developer.nps.gov/api/v1/parks?api_key=an37e2Ppy9WcQfy49UMTcCmkLGx6ExPIU7Z3D0qc"


fetch(npsURL) 
.then(function(response) {
 return response.json()
 .then(function(data) {
  console.log(data)
 })
})

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
}


function getParkList() {
//console.log(Object.entries(stateNPList))
for (var key in stateNPList) {
 console.log(key + ":" + stateNPList[key])
}
}

var stateNPList = {
 AL: ["DENA", "GAAR", "GLBA", "KATM", "KEFJ", "KOVA", "LACL", "WRST"],
 AK: [],
 AZ: ["GRCA", "PEFO", "SAGU"],
 AR: ["HOSP"],
 CA: ["CHIS", "DEVA", "JOTR", "KICA", "LAVO", "REDW", "SEQU", "YOSE"],
 CO: ["BLCA", "GRSA", "MEVE", "ROMO"],
 CT: [],
 DE: [],
 FL: ["BISC", "DRTO", "EVER"],
 GA: [],
 HI: ["HALE", "HAVO"],
 ID: ["YELL"],
 IL: [],
 IN: [],
 IA: [],
 KS: [],
 KY: ["MACA"],
 LA: [],
 ME: ["ACAD"],
 MD: [],
 MA: [],
 MI: ["ISRO"],
 MN: ["VOYA"],
 MS: [],
 MO: [],
 MT: ["GLAC", "YELL"],
 NE: [],
 NV: ["GRBA"],
 NH: [],
 NJ: [],
 NM: ["CACA"],
 NY: [],
 NC: ["GRSM"],
 ND: ["THRO"],
 OH: ["CUVA"],
 OK: [],
 OR: ["CRLA"],
 PA: [],
 RI: [],
 SC: ["CONG"],
 SD: ["BADL", "WICA"],
 TN: ["GRSM"],
 TX: ["BIBE", "GUMO"],
 UT: ["ARCH", "BRCA", "CANY", "CARE", "ZION"],
 VT: [],
 VA: ["SHEN"],
 WA: ["MORA", "NOCA", "OLYM"],
 WV: [],
 WI: [],
 WY: ["GRTE", "YELL"],
}

getParkList()