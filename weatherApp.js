window.onload = function() {
    let latitude = 37.913387;
    let longitude = -89.814009;
    let locationText = document.getElementById("location-text");
    let preciptationText = document.getElementById("preciptation-text");
    let temperatureMeasurement = document.getElementById("temperature-text");
    let temperatureUnit = document.getElementById("temperature-unit");
    let temperatureSection = document.querySelector(".temperature");

    // use google maps API to get this after search
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationInfo => {
            latitude = geolocationInfo.coords.latitude
            longitude = geolocationInfo.coords.longitude
        });
    }

    const apiWeatherData = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=minutely,hourly&appid=6904f001221c4762a57f0cca6104e776&units=metric`;

    fetch(apiWeatherData)
        .then(response => response.json())
        .then(json => {
            currentTemp = json.current.temp;
            currentPrecip = json.current.weather[0].description;
            temperatureMeasurement.innerText = currentTemp;
            preciptationText.innerText = currentPrecip;
        });
    
    function convertTemperatureUnits() {
        if(temperatureUnit.innerText === "°C") {
            temperatureMeasurement.innerText = celsiusToFahrenheit(Number(temperatureMeasurement.innerText, 10));
            temperatureUnit.innerText = "°F";
        } else {
            temperatureMeasurement.innerText = fahrenheitToCelsius(Number(temperatureMeasurement.innerText, 10));
            temperatureUnit.innerText = "°C";
        }
    }

    function fahrenheitToCelsius(fahrenheit) {
        f = (fahrenheit - 32) * (5 / 9);
        return f.toFixed(2);
    }

    function celsiusToFahrenheit(celsius) {
        c = (celsius * (9 / 5 )) + 32;
        return c.toFixed(2);
    }

    temperatureSection.addEventListener("click", convertTemperatureUnits);

    // one call -  https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=0.1278&%20exclude={part}&appid=6904f001221c4762a57f0cca6104e776&units=metric
    // current weather-  https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
}