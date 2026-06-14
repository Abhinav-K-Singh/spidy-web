/* ====================================
   ID GENERATOR
==================================== */

function generateId(){

    return Date.now().toString(36) +
    Math.random()
    .toString(36)
    .substring(2,9);

}

/* ====================================
   RANDOM QUOTES
==================================== */

const SpiderQuotes = [

"With great code comes great responsibility.",

"Every bug has an origin story.",

"THWIP! Another feature shipped.",

"Friendly neighborhood developer online.",

"Small commits. Big adventures.",

"Saving production one deploy at a time.",

"The multiverse rewards consistency.",

"Build. Travel. Repeat.",

"Code is a passport to possibility.",

"Another day. Another universe."

];

function getRandomQuote(){

    return SpiderQuotes[
        Math.floor(
            Math.random() *
            SpiderQuotes.length
        )
    ];

}

/* ====================================
   DATE HELPERS
==================================== */

function formatDate(date){

    return date.toLocaleDateString(
        "en-US",
        {

            weekday:"long",

            year:"numeric",

            month:"long",

            day:"numeric"

        }
    );

}

function getCurrentDate(){

    return formatDate(
        new Date()
    );

}

/* ====================================
   TIME HELPERS
==================================== */

function getCurrentTime(){

    return new Date()
    .toLocaleTimeString();

}

function getGreeting(){

    const hour =
    new Date().getHours();

    if(hour < 12){

        return "Good Morning";

    }

    if(hour < 18){

        return "Good Afternoon";

    }

    return "Good Evening";

}

/* ====================================
   TEXT COLOR DETECTION
==================================== */

function getContrastColor(hex){

    if(!hex)
    return "#ffffff";

    hex =
    hex.replace("#","");

    const r =
    parseInt(
        hex.substr(0,2),
        16
    );

    const g =
    parseInt(
        hex.substr(2,2),
        16
    );

    const b =
    parseInt(
        hex.substr(4,2),
        16
    );

    const brightness =

    (r * 299 +
     g * 587 +
     b * 114)

     / 1000;

    return brightness > 125
    ? "#000000"
    : "#ffffff";

}

/* ====================================
   DEBOUNCE
==================================== */

function debounce(
    callback,
    delay = 300
){

    let timeout;

    return (...args)=>{

        clearTimeout(timeout);

        timeout =
        setTimeout(

            ()=>{

                callback(...args);

            },

            delay

        );

    };

}

/* ====================================
   SEARCH ENGINE URLS
==================================== */

function buildSearchUrl(
    query,
    engine
){

    switch(engine){

        case "youtube":

            return
            "https://www.youtube.com/results?search_query="
            +
            encodeURIComponent(query);

        case "github":

            return
            "https://github.com/search?q="
            +
            encodeURIComponent(query);

        default:

            return
            "https://www.google.com/search?q="
            +
            encodeURIComponent(query);

    }

}

/* ====================================
   LOCAL IMAGE TO DATA URL
==================================== */

function fileToDataUrl(file){

    return new Promise(

        (resolve,reject)=>{

            const reader =
            new FileReader();

            reader.onload =
            ()=>resolve(
                reader.result
            );

            reader.onerror =
            reject;

            reader.readAsDataURL(
                file
            );

        }

    );

}

/* ====================================
   AUTO THEME
==================================== */

function detectThemeByTime(){

    const hour =
    new Date().getHours();

    if(
        hour >= 6 &&
        hour < 18
    ){

        return "light";

    }

    return "dark";

}

/* ====================================
   QUICK NOTIFICATION
==================================== */

function showToast(message){

    let toast =
    document.createElement(
        "div"
    );

    toast.className =
    "spidy-toast";

    toast.innerText =
    message;

    document.body.appendChild(
        toast
    );

    setTimeout(()=>{

        toast.remove();

    },2500);

}

/* ====================================
   DOWNLOAD FILE
==================================== */

function downloadFile(
    filename,
    content
){

    const blob =
    new Blob(
        [content]
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(
        blob
    );

    link.download =
    filename;

    link.click();

}

/* ====================================
   SAFE JSON PARSE
==================================== */

function safeJsonParse(data){

    try{

        return JSON.parse(
            data
        );

    }catch{

        return null;

    }

}