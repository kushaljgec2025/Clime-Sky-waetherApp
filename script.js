
let weather = {
    apiKey: "686050e0560d4198e0ee1ff07e057ccb",
    fetchWeather: function (city) {

        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city

            + "&units=metric&APPID="
            + this.apiKey
        ).then((response) => response.json())
            .then((data) => this.displayweather(data));
    },
    displayweather: function (data) {

        const { name } = data;
        console.log(name);
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";

        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speedn: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
};
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});
document.querySelector(".searchBar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") { weather.search() }
})


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        var lat = latitude.toString();
        var lng = longitude.toString();
        var coordinates = [lat, lng];
        getCity(coordinates);
        // getAddress("13.0827", "80.2707")
        //   .then(console.log)
        //   .catch(console.error);
        console.log(coordinates);
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}

function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];

    // Paste your LocationIQ token below.
    xhr.open(
        "GET",
        "https://us1.locationiq.com/v1/reverse.php?key=pk.f314eae3a4510b6fe647cdc92c614a76&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
        true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            if (city) { weather.fetchWeather(city); console.log("called location api" + city); }

            else { weather.fetchWeather('kolkata'); console.log("failed location api") }
            console.log("locationiq  : " + city);
            return;
        }
    }
}

// let city_name;

// fetch(
//     "https://api.geoapify.com/v1/ipinfo?apiKey=a4a65a5f7de94ae3808c4c1116574660"
// )
//     .then((response) => response.json())
//     .then((data) => {
//         // You can now access the location data in the "data" object
//         console.log(data);

//         var cc = data.city.name;



//     });
// let myAPIKey = "a4a65a5f7de94ae3808c4c1116574660";
// const map = new maplibregl.Map({
//     container: "map",
//     style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=${myAPIKey}`,
// });

// fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${myAPIKey}`)
//     .then((response) => response.json())
//     .then((positionData) => {
//         console.log(
//             `Lat: ${positionData.location.latitude}, lon: ${positionData.location.longitude}`
//         );


//         // Locate the map to the city level
//         map.flyTo({
//             center: [
//                 positionData.location.longitude,
//                 positionData.location.latitude,
//             ],
//             zoom: 10,
//         });
//     });

// // Create the geolocate control.
// const geolocate = new maplibregl.GeolocateControl({
//     positionOptions: { enableHighAccuracy: true },
//     trackUserLocation: false,
// });

// // Add the control to the map
// map.addControl(geolocate, "bottom-right");

// // Listen for the geolocate event
// geolocate.on("geolocate", function (positionData) {
//     // get address by coordinates with Geoapify Reverse Geocoding API
//     console.log(positionData.location.latitude, positionData.location.longitude);
//     console.log(
//         `Lat: ${positionData.coords.latitude}, lon: ${positionData.coords.longitude}`
//     );
//     getAddress(
//         positionData.coords.latitude,
//         positionData.coords.longitude
//     ).then((address) => {
//         console.log(address);
//     });
// });

// function getAddress(lat, lon) {
//     return fetch(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${myAPIKey}`
//     )
//         .then((result) => result.json())
//         .then((result) => {
//             if (result && result.results.length) {
//                 return result.results[0].formatted;
//             }

//             return null;
//         });
// }
// function getCoordintes() {
//     var options = {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//     };

//     function success(pos) {
//         var crd = pos.coords;
//         var lat = crd.latitude.toString();
//         var lng = crd.longitude.toString();
//         var coordinates = [lat, lng];
//         console.log(`Latitude: ${lat}, Longitude: ${lng}`);
//         getCity(coordinates);
//         return;

//     }

//     function error(err) {
//         console.warn(`ERROR(${err.code}): ${err.message}`);
//     }

//     navigator.geolocation.getCurrentPosition(success, error, options);
// }

// // Step 2: Get city name
// function getCity(coordinates) {
//     var xhr = new XMLHttpRequest();
//     var lat = coordinates[0];
//     var lng = coordinates[1];

//     // Paste your LocationIQ token below.
//     xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.f314eae3a4510b6fe647cdc92c614a76&lat=" +
//         lat + "&lon=" + lng + "&format=json", true);
//     xhr.send();
//     xhr.onreadystatechange = processRequest;
//     xhr.addEventListener("readystatechange", processRequest, false);

//     function processRequest(e) {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             var response = JSON.parse(xhr.responseText);
//             var city = response.address.city;
//             console.log(city);
//             return;
//         }
//     }
// }

// getCoordintes();


