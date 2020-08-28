window.onload = function() {
    let locationsOrderedList = document.querySelector("#location-search-results");
    let citySearchResults = JSON.parse(sessionStorage.getItem("searchResults"));
    let descriptionText = document.querySelector("#description");
    console.log(citySearchResults);

    // make sure there are locations in results
    if (citySearchResults.length == 0) descriptionText.innerHTML = "No results found.";

    // append cities onto HTML list
    let counter = 0
    citySearchResults.forEach(city => {
        let node = document.createElement("LI");
        node.id = `location${counter}`;
        let textnode = document.createTextNode(city.formatted);
        node.appendChild(textnode);
        locationsOrderedList.appendChild(node);
        counter += 1;
    });

    // when location in list is clicked, put choosen location in sessionStorage and go to weatherInfo page
    locationsOrderedList.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "LI") {
            let targetId = e.target.id;
            let index = targetId.charAt(targetId.length - 1);
            sessionStorage.setItem("selectedLocation", JSON.stringify(citySearchResults[index]));
            let a = JSON.stringify(citySearchResults[index]);
            window.location.href = "/weatherInfo.html";
        }
    });
}