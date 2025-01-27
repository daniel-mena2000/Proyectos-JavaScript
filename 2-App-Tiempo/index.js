const codigo = "44b85ea617fae8d961dea3bdec57151f";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${codigo}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error("Error fetching the weather data:", error);
        weatherDataEl.innerHTML = "<p>Error fetching the weather data. Please try again.</p>";
    }
}

function displayWeatherData(data) {
    const { name, main, weather, wind } = data;

    weatherDataEl.innerHTML = `
        <div class="icon">
            <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
        </div>
        <div class="temperature">
            ${main.temp}°C
        </div>
        <div class="description">
            ${weather[0].description}
        </div>
        <div class="details">
            <div>Feels like: ${main.feels_like}°C</div>
            <div>Humidity: ${main.humidity}%</div>
            <div>Wind speed: ${wind.speed} m/s</div>
        </div>
    `;
}

