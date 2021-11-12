/* Global Variables */

// saving the personal API key in a variable [const] that cannot be re-assigned or re-declared
// instead of sending the username and password everytime i want to check the weather of a country so i use this API KEY
const weatherMapApiKey = "560133eb1266b55e7a14a70a1b13a725";
// getting access to the generate button by its ID
const generate = document.getElementById("generate");
// now we add the EVENTLISTENER to the button GENERATE
generate.addEventListener("click", async () => {
  let info = await callOpenWeather();
  await saveEntry(info);
  let entry = await getEntry();
  renderEntry(entry);
});

async function callOpenWeather() {
  // to get the value of the zipCode to be used in the [weatherMapUrl]
  const zipCode = document.getElementById("zip").value;

  // saving the url related to ZipCode and the unique API key in a variable [const]
  const weatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${weatherMapApiKey}`;
  // the fetch prperty is used to go and get the wanted info from this URL and logging in useing the unique API KEY
  // instead this way there are other ways that achieve the same purpose such as {chaining promising and parsing }
  const res = await fetch(weatherMapUrl);

  // After fetching with OpenWeatherMap.com, we assign the async response method to a const variable [info]
  // Which returns to me an object that contains all the information about [weather and wind...etc] related to the specified zipcode
  const info = await res.json();

  // but here we dont want all the information in the object to be returned we just want the temprature or weather
  // so we assign the temprature to another const variable [temprature] to make it easier to show on the UI
  const temprature = info.main.temp;

  // just to make sure that the right information are being retieved
  return temprature;
}

// function that stores te data [date , feeling , temprature] 
async function saveEntry(info) {
  // Create a new date instance dynamically with JS
  let d = new Date();
  let date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

  const content = document.getElementById("feelings").value;
  await fetch("/saveEntry", {
    method: "post",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, temp: info, content }),
  });
}

// function to get the data from the specified API
async function getEntry() {
  const response = await fetch("/getEntry");
  const entry = await response.json();
  return entry;
}

// function to show the data collected by the get route in the UI
function renderEntry(entry) {
  document.getElementById("date").innerHTML = entry.date; // adds the date to {Most Recent Entry} section
  document.getElementById("temp").innerHTML = entry.temp; // adds the temprature to {Most Recent Entry} section
  document.getElementById("content").innerHTML = entry.content; // adds the feeling written by the user to {Most Recent Entry} section
}
