const input = document.querySelector("#userInput");
const weatherInfoDisplay = document.querySelector("#weatherInfoDisplay");
const form = document.querySelector("#weatherForm");
const button = document.querySelector("#searchBtn");
const temperature = document.querySelector("#temp");
const iconDisplay = document.querySelector("#icon");
const apiKey = "c364a201752b45cc8f5222510250804";

function clearInputHandler() {
  input.value = "";
}

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      iconDisplay.src = `https:${data.current.condition.icon}`;
      temperature.innerHTML = `${data.current.temp_c}°C`;
      weatherInfoDisplay.innerHTML = `The weather in ${city} (${data.location.country}) is currently ${data.current.condition.text.toLowerCase()}. Temperature: ${data.current.temp_c}°C | Humidity: ${data.current.humidity}% | Wind: ${data.current.wind_kph} km/h ${data.current.wind_dir}.`;

      clearInputHandler();
    }
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = input.value;
    const city = userInput.trim();

    fetchWeather(city);
  });
});
