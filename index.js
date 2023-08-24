const cities = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
  { name: "Sydney", lat: -33.8651, lng: 151.2099 },
  { name: "Rome", lat: 41.9028, lng: 12.4964 },
  { name: "Cairo", lat: 30.0444, lng: 31.2357 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Rabat", lat: 34.0209, lng: -6.8416 },
];

function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

async function fetchTemperature(city) {
  console.log(city);
  const apiKey = "YOUR_WEATHER_API_KEY"; // Replace with your actual API key
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    const temperature = data.current_weather.temperature;
    return temperature;
  } catch (error) {
    console.error("Error fetching temperature:", error);
    return null;
  }
}

document.getElementById("fetchButton").addEventListener("click", async () => {
  const selectedCity = selectRandomCity(cities);
  const cityNameElement = document.getElementById("cityName");
  cityNameElement.textContent = selectedCity.name;

  const temperatureElement = document.getElementById("temperature");
  temperatureElement.textContent = "Fetching...";

  const temperature = await fetchTemperature(selectedCity);
  if (temperature !== null) {
    temperatureElement.textContent = `${temperature}°C`;
  } else {
    temperatureElement.textContent = "Error fetching temperature";
  }
});
