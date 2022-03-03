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