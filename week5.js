// Lab Week 4
// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)

  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {
    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location
    let locationInput = document.querySelector(`#location`)
    // - Get the user-entered location & days from the element's value
    let location = locationInput.value

    // - Get a reference to the element containing the user-entered days
    let daysInput = document.querySelector(`#days`)
    // - Get the user-entered days from the element's value
    let days = daysInput.value
    
    // - Check to see if the user entered anything; if so:
    if (location.length > 0) {
      document.querySelector(`.forecast`).innerHTML = ``

      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=2abe2cfd2fdd4a3cb54161422212704&q=${location}&days=${days}`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // - Store the returned location, current weather conditions, the forecast as three separate variables
      let interpretedLocation = json.location
      let current = json.current
      let forecast = json.forecast

      // Store a reference to the "current" element
      let currentElement = document.querySelector(`.current`)

      // Fill the current element with the location and current weather conditions
      currentElement.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
          <div class="font-bold">
            <img src="https:${current.condition.icon}" class="inline-block">
            <span class="temperature"> ${current.temp_f}</span>° 
            and
            <span class="conditions"> ${current.condition.text}</span>
          </div>
        </div>
      `
      
      // Fill forecast header for user-selected days
      let forecastElement = document.querySelector(`.forecast`)
      forecastElement.innerHTML = `
      <div class="text-center space-y-8">
      <div class="font-bold text-3xl">${days} Day Forecast</div>
      </div>
      `
          
               
      // create a for loop for the forecast data
      for(let i=0; i < forecast.forecastday.length;i++){
        let forecastday = forecast.forecastday[i]
        
        // fill forecast element with # of days and forecast element with weather icon, date, hi/lo temps, and forecast weather conditions from for loop
        forecastElement.insertAdjacentHTML(`beforeend`,`
        <div class="text-center">
          <img src="https:${forecastday.day.condition.icon}" class="mx-auto">
          <h1 class="text-2xl text-bold text-gray-500">${forecastday.date}</h1>
          <h2 class="text-xl">High ${forecastday.day.maxtemp_f}° - Low ${forecastday.day.mintemp_f}°</h2>
          <p class="text-gray-500">${forecastday.day.condition.text}</h1>
        </div>
        `
      )
      }

      }
      
        }
  )
})
