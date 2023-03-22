const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

function getLocationInfo(city, state, zip, fn) {
    const baseUrl = "https://api.openweathermap.org/geo/1.0/direct?appid=" + apiKey;
    const url = baseUrl + "&q=" + city + ", " + state + ", " + zip;
    https.get(url, (res) => {
        res.on("data", (data) => {
            const locationData = JSON.parse(data);
            console.log("locationData[0]:");
            console.log(locationData[0]);
            fn(locationData[0]);
        });
    });
}

function getWeatherInfo(lat, lon, units, fn) {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey;
    const url = baseUrl + "&lat=" + lat + "&lon=" + lon + "&units=" + units;
    https.get(url, (res) => {
        res.on("data", (data) => {
            const weatherData = JSON.parse(data);
            console.log("weatherData:");
            console.log(weatherData);
            fn(weatherData);
        })
    })
}