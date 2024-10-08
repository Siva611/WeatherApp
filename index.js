const apiKey = "d555aa30799d0318bea179a67461e2bc"

let datalist = document.getElementById("places");
let locations = fetch("https://countriesnow.space/api/v0.1/countries")
    .then((response) => { // fetching countries & States information
        response.json().then(({ data }) => {
            data.map((e) => {
                datalist.innerHTML += `<option value=${e.country}>${e.country}</option>`
                if (e.country === "India") {
                    e.cities.map((city) => { datalist.innerHTML += `<option value=${city}>${city}</option>` })
                }
            })
        })
    })



let search = document.getElementById("search");


function getData(data) {

    let temperatur = document.getElementById("temperature");
    temperatur.innerText = Math.round(data.main.temp - 273);
    let description = document.getElementById("description");
    description.innerText = data.weather[0].description;
    let loc_name = document.getElementById("loc-name");
    loc_name.innerText = data.name;
    let weather_img = document.getElementById("weather-img");
    weather_img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let wind_rate = document.getElementById("wind-speed")
    wind_rate.innerText = data.wind.speed
    let pressure = document.getElementById("pressure")
    pressure.innerText = data.main.pressure / 1000
    let humidity = document.getElementById("humidity");
    humidity.innerText = data.main.humidity + " %";
    let visibility = document.getElementById("visibility")
    visibility.innerText = data.visibility;
    let sunrise = document.getElementById("sunrise");
    let sunset = document.getElementById("sunset");
    function timeMaker(ms) {
        var date = new Date(ms * 1000); // multiply by 1000 because Date() requires miliseconds
        var timeStr = date.toTimeString().split(' ')[0];
        return timeStr;
    }
    let country = document.getElementById("country")
    country.innerText = data.sys.country
    sunrise.innerText = timeMaker(data.sys.sunrise);
    sunset.innerText = timeMaker(data.sys.sunset);
    let loc_time = document.getElementById("loc-time");
    loc_time.innerText = data.timezone
    let loc_date = document.getElementById("loc-date")
    loc_date.innerText = data.dt;

    let d = new Date();
    let pl = d.getTime() + d.getTimezoneOffset() + data.timezone
    let nd = new Date(pl);
    loc_date.innerText = nd.toDateString();
    loc_time.innerText = nd.toLocaleString().split(',')[1];
}

// location by latitude and longitude====================
let longitude;
let latitude;
navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    let l = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    l.then((response) => {
        response.json().then((data) => {
            getData(data);
        })
    })
})
// location by latitude and longitude=================




search.addEventListener("click", () => { // fetching weather information
    let place = document.getElementById("place").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`
    let x = fetch(url);
    x.then((response) => {
        response.json().then((data) => {
            getData(data)
        })
            .catch((data) => { window.location.href = "./404.html" }) // invalid city or country
    })
})




// copy right year
let year = document.getElementById("year");
year.innerText = new Date().getFullYear();




// update time every 1s 
let time_el = document.getElementById("time");
setInterval(() => {
    let time = new Date();
    time = time.toLocaleTimeString();
    time_el.innerText = time;
}, 1000)









