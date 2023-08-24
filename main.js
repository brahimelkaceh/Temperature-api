const fs = require("fs").promises;
const cities = require("./cities");

function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

async function fetchTemperature(city) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const temperature = data.current_weather.temperature;
    return temperature;
  } catch (error) {
    throw new Error("Error fetching temperature");
  }
}

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log(`Temperature written to ${filePath}`);
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

(async () => {
  try {
    const selectedCity = selectRandomCity(cities);
    const cityName = selectedCity.name;

    const temperature = await fetchTemperature(selectedCity);

    if (temperature !== null) {
      const fileName = `${cityName}.txt`;
      await writeFile(fileName, `The Temperature is : ${temperature}°C`);
    } else {
      console.log("Error fetching temperature");
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
})();
