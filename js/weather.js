/* ====================================
   WEATHER SYSTEM
==================================== */

const weatherElements = {

    icon:
    document.getElementById(
        "weatherIcon"
    ),

    temp:
    document.getElementById(
        "temperature"
    ),

    location:
    document.getElementById(
        "location"
    )

};

/* ====================================
   WEATHER ICONS
==================================== */

function getWeatherIcon(code){

    if(
        code === 0
    ){

        return "☀️";

    }

    if(
        [1,2,3]
        .includes(code)
    ){

        return "⛅";

    }

    if(
        [45,48]
        .includes(code)
    ){

        return "🌫️";

    }

    if(
        [
            51,53,55,
            61,63,65,
            80,81,82
        ]
        .includes(code)
    ){

        return "🌧️";

    }

    if(
        [
            71,73,75,
            77,85,86
        ]
        .includes(code)
    ){

        return "❄️";

    }

    if(
        [
            95,96,99
        ]
        .includes(code)
    ){

        return "⛈️";

    }

    return "🌤️";

}

/* ====================================
   LOCATION
==================================== */

function getCurrentPosition(){

    return new Promise(

        (resolve,reject)=>{

            if(
                !navigator.geolocation
            ){

                reject(
                    "Geolocation Unsupported"
                );

                return;

            }

            navigator.geolocation
            .getCurrentPosition(

                resolve,

                reject,

                {

                    enableHighAccuracy:true,

                    timeout:10000

                }

            );

        }

    );

}

/* ====================================
   REVERSE GEOCODE
==================================== */

async function getLocationName(
    latitude,
    longitude
){

    try{

        const response =
        await fetch(

            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`

        );

        const data =
        await response.json();

        return (

            data.address?.city ||

            data.address?.town ||

            data.address?.village ||

            "Current Location"

        );

    }

    catch{

        return "Current Location";

    }

}

/* ====================================
   WEATHER FETCH
==================================== */

async function loadWeather(){

    try{

        weatherElements.location.innerText =
        "Loading Weather...";

        const position =
        await getCurrentPosition();

        const latitude =
        position.coords.latitude;

        const longitude =
        position.coords.longitude;

        const weatherResponse =
        await fetch(

            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`

        );

        const weatherData =
        await weatherResponse.json();

        const current =
        weatherData.current;

        const locationName =
        await getLocationName(

            latitude,
            longitude

        );

        renderWeather(

            current,

            locationName

        );

    }

    catch(error){

        console.error(
            error
        );

        weatherElements.location.innerText =
        "Weather Unavailable";

        weatherElements.temp.innerText =
        "--";

        weatherElements.icon.innerText =
        "🌤️";

    }

}

/* ====================================
   RENDER WEATHER
==================================== */

function renderWeather(

    current,

    locationName

){

    weatherElements.temp.innerText =

        Math.round(
            current.temperature_2m
        ) + "°C";

    weatherElements.location.innerHTML =

        `
        ${locationName}
        <br>
        💨 ${Math.round(current.wind_speed_10m)} km/h
        <br>
        💧 ${current.relative_humidity_2m}%
        `;

    weatherElements.icon.innerText =

        getWeatherIcon(
            current.weather_code
        );

}

/* ====================================
   AUTO REFRESH
==================================== */

function startWeatherRefresh(){

    loadWeather();

    setInterval(

        loadWeather,

        1000 * 60 * 15

    );

}

/* ====================================
   WEATHER CACHE
==================================== */

function saveWeatherCache(data){

    Storage.save(

        "weather_cache",

        data

    );

}

function loadWeatherCache(){

    return Storage.load(

        "weather_cache"

    );

}

/* ====================================
   INITIALIZE
==================================== */

startWeatherRefresh();

console.log(
    "🌦 Weather Loaded"
);