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
        document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+name+"')"
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
weather.fetchWeather('kolkata')
