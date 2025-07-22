const apiKey = "907a6074b1c1436191f45835252207";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const loader = document.getElementById("loader");
  const result = document.getElementById("weatherResult");

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  loader.classList.remove("hidden");
  loader.classList.add("show");
  result.classList.add("hidden");

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    document.getElementById("cityName").innerText = data.location.name + ", " + data.location.country;
    document.getElementById("temperature").innerText = data.current.temp_c;
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("humidity").innerText = data.current.humidity;
    document.getElementById("wind").innerText = data.current.wind_kph;
    document.getElementById("weatherIcon").src = "https:" + data.current.condition.icon;

    result.classList.remove("hidden");
    result.classList.add("show");
    changeBackground(data.current.condition.text.toLowerCase());

  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    loader.classList.add("hidden");
    loader.classList.remove("show");
  }
}

function changeBackground(condition) {
  const body = document.body;

  if (condition.includes("sunny")) {
    body.style.background = "url('https://source.unsplash.com/1600x900/?sunny') no-repeat center center/cover";
  } else if (condition.includes("cloud")) {
    body.style.background = "url('https://source.unsplash.com/1600x900/?cloudy') no-repeat center center/cover";
  } else if (condition.includes("rain")) {
    body.style.background = "url('https://source.unsplash.com/1600x900/?rain') no-repeat center center/cover";
  } else if (condition.includes("snow")) {
    body.style.background = "url('https://source.unsplash.com/1600x900/?snow') no-repeat center center/cover";
  } else if (condition.includes("fog") || condition.includes("mist")) {
    body.style.background = "url('https://source.unsplash.com/1600x900/?fog') no-repeat center center/cover";
  } else {
    body.style.background = "linear-gradient(to right, #2980b9, #6dd5fa)";
  }
}
