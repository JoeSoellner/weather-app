window.onload = function() {
    let city = document.querySelector("#cityInput");
    let form = document.querySelector("#locationForm");

    form.addEventListener("submit", event => {
        event.preventDefault();

        // if nothing entered dont do anything
        if (city.value.length < 1) return;
        
        // api call to convert city name to latitude and longitude
        const apiLocationData = `https://api.opencagedata.com/geocode/v1/json?q=${city.value}&key=182979c557e64f979315c5f1205c8bb9&pretty=1`;

        fetch(apiLocationData)
            .then(response => response.json())
            .then(json => {
                // check if browser supports session/local storage
                if (typeof Storage !== "undefined") {
                    sessionStorage.setItem("searchResults", JSON.stringify(json.results));
                    window.location.href = "/displayResults.html";
                } else {
                    alert("Your browser does not support sessionStorage. Switch your browser to use this website.");
                }
            }
        );
    });
}