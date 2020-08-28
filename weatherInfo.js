window.onload = function() {
    var latitude = 0;
    var longitude = 0;
    let locationText = document.getElementById("location-text");
    let precipitationText = document.getElementById("precipitation-text");
    let temperatureMeasurement = document.getElementById("temperature-text");
    let temperatureUnit = document.getElementById("temperature-unit");
    let temperatureSection = document.querySelector(".temperature");
    // get the user selected location from the seesion storage
    let selectedLocation = JSON.parse(sessionStorage.getItem("selectedLocation"));

    // check that selected location is not null before just in case
    if (selectedLocation) {
        latitude = selectedLocation.geometry.lat;
        longitude = selectedLocation.geometry.lng;
        // use the first section from the formatted string instead of messing with components in object
        locationText.innerText = selectedLocation.formatted.split(",")[0];
    }

    // api call, key is not linked to anything important but there is limit on the calls per day (1mil per month)
    const apiWeatherData = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=minutely,hourly&appid=6904f001221c4762a57f0cca6104e776&units=metric`;

    // fetchs the weather data and displays it
    fetch(apiWeatherData)
        .then(response => response.json())
        .then(json => {
            let currentTemp = json.current.temp;
            let currentPrecip = json.current.weather[0].description;
            var iconType = json.current.weather[0].icon;
            temperatureMeasurement.innerText = currentTemp;
            // capitalizes first letter of the precipitation description
            precipitationText.innerText = currentPrecip.charAt(0).toUpperCase() + currentPrecip.slice(1);
            setIcon(iconType, document.getElementById("weatherIcon"));
    });
        
    temperatureSection.addEventListener("click", convertTemperatureUnits);
    
    // checks what the current temp unit is and then swaps the unit and converts the temperature
    function convertTemperatureUnits() {
        if(temperatureUnit.innerText === "°C") {
            temperatureMeasurement.innerText = celsiusToFahrenheit(Number(temperatureMeasurement.innerText, 10));
            temperatureUnit.innerText = "°F";
        } else {
            temperatureMeasurement.innerText = fahrenheitToCelsius(Number(temperatureMeasurement.innerText, 10));
            temperatureUnit.innerText = "°C";
        }
    }

    // converts to Celsius and rounds to two floating points
    function fahrenheitToCelsius(fahrenheit) {
        f = (fahrenheit - 32) * (5 / 9);
        return f.toFixed(0);
    }

    // converts to Fahrenheit and rounds to two floating points
    function celsiusToFahrenheit(celsius) {
        c = (celsius * (9 / 5 )) + 32;
        return c.toFixed(0);
    }

    // sets the icon based off the api's icon and places it on the document
    function setIcon(apiIcon, htmlIdToReplace) {
        const skycons = new Skycons({color : "white"});
        skyconPecipType = apiIconToSkycon(apiIcon);
        skycons.play();
        return skycons.set(htmlIdToReplace, Skycons[skyconPecipType]);
    }

    // converts the text the api uses for their icons to the text skycons uses to name their icons
    function apiIconToSkycon(apiIcon) {
        let iconType;

        switch(apiIcon) {
            case "01d":
                iconType = "clear_day";
                break;
            case "01n":
                iconType = "clear_night";
                break;
            case "02d":
                iconType = "partly_cloudy_day";
                break;
            case "02n":
                iconType = "partly_cloudy_night";
                break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                iconType = "cloudy";
                break;
            case "09d":
                iconType = "showers_day";
                break;
            case "09n":
                iconType = "showers_night";
                break;
            case "10d":
            case "10n":
                iconType = "rain";
                break;
            case "11d":
                iconType = "thunder_showers_day";
                break;
            case "11n":
                iconType = "thunder_showers_night";
                break;
            case "13d":
                iconType = "snow_showers_day";
                break;
            case "13n":
                iconType = "snow_showers_night";
                break;
            case "50d":
            case "50n":
                iconType = "fog";
                break;
            default:
                iconType = "clear_day";
        }

        return iconType.toUpperCase();
    }
}