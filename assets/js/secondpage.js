var weatherURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={90fb50fac270c54c352e49a47c6e77fa}"
var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={90fb50fac270c54c352e49a47c6e77fa}"
var npsURL = "https://developer.nps.gov/api/v1/parks?api_key=an37e2Ppy9WcQfy49UMTcCmkLGx6ExPIU7Z3D0qc"

// testing out npsURL API url for functionality
fetch(npsURL) 
.then(function(response) {
 return response.json()
 .then(function(data) {
  console.log(data)
 })
})


// national parks array by state
var nationalParks = {
 AL: ["Denali National Park|dena", "Gates of the Arctic National Park|gaar", "Glacier Bay National Park|glba", "Katmai National Park|katm", "Kenai Fjords National Park|kefj", "Kobuk Valley National Park|kova", "Lake Clark National Park|lacl", "Wrangell-St. Elias National Park|wrst"],
 AK: [],
 AZ: ["Grand Canyon National Park|grca", "Petrified Forest National Park|pefo", "Saguaro National Park|sagu"],
 AR: ["Hot Springs National Park|hosp"],
 CA: ["Channel Islands National Park|chis", "Death Valley National Park|deva", "Joshua Tree National Park|jotr", "Kings Canyon National Park|kica", "Lassen Volcanic National Park|lavo", "Redwood National Park|redw", "Sequoia National Park|sequ", "Yosemite National Park|yose"],
 CO: ["Black Canyon of the Gunnison National Park|blca", "Great Sand Dunes National Park|grsa", "Mesa Verde National Park|meve", "Rocky Mountain National Park|romo"],
 CT: [],
 DE: [],
 FL: ["Biscayne National Park|bisc", "Dry Tortugas National Park|drto", "Everglades National Park|ever"],
 GA: [],
 HI: ["Haleakala National Park|hale", "Hawaii Volcanoes National Park|havo"],
 ID: ["Yellowstone National Park|yell"],
 IL: [],
 IN: [],
 IA: [],
 KS: [],
 KY: ["Mammoth Cave National Park|maca"],
 LA: [],
 ME: ["Acadia National Park|acad"],
 MD: [],
 MA: [],
 MI: ["Isle Royale National Park|isro"],
 MN: ["Voyageurs National Park|voya"],
 MS: [],
 MO: [],
 MT: ["Glacier National Park|glac", "Yellowstone National Park|yell"],
 NE: [],
 NV: ["Great Basin National Park|grba"],
 NH: [],
 NJ: [],
 NM: ["Carlsbad Caverns National Park|caca"],
 NY: [],
 NC: ["Great Smoky Mountains National Park|grsm"],
 ND: ["Theodore Roosevelt National Park|thro"],
 OH: ["Cuyahoga Valley National Park|cuya"],
 OK: [],
 OR: ["Crater Lake National Park|crla"],
 PA: [],
 RI: [],
 SC: ["Congaree National Park|cong"],
 SD: ["Badlands National Park|badl", "Wind Cave National Park|wica"],
 TN: ["Great Smoky Mountains National Park|grsm"],
 TX: ["Big Bend National Park|bibe", "Guadalupe Mountains National Park|gumo"],
 UT: ["Arches National Park|arch", "Bryce Canyon National Park|brca", "Canyonlands National Park|cany", "Capitol Reef National Park|care", "Zion National Park|zion"],
 VT: [],
 VA: ["Shenandoah National Park|shen"],
 WA: ["Mount Rainier National Park|mora", "North Cascades National Park|noca", "Olympic National Park|olym"],
 WV: [],
 WI: [],
 WY: ["Grand Teton National Park|grte", "Yellowstone National Park|yell"],
}

// trying to make getParkList function pull value from specific key
function getParkList() {
//console.log(Object.entries(stateNPList))
for (var key in stateNPList) {
 console.log(key + ":" + stateNPList[key])
}
}

// 4 letter code national parks array by state
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