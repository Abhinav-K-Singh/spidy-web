/* ====================================
   SPIDY SIDEBAR V2
==================================== */

const sidebar =
document.getElementById(
"sidebar"
);

const sidebarToggle =
document.getElementById(
"sidebar-toggle"
);

/* ====================================
   COLLAPSE / EXPAND
==================================== */

sidebarToggle?.addEventListener(

"click",

()=>{

sidebar.classList.toggle(
"collapsed"
);

localStorage.setItem(

"sidebarCollapsed",

sidebar.classList.contains(
"collapsed"
)

);

}

);

/* ====================================
   RESTORE STATE
==================================== */

if(

localStorage.getItem(
"sidebarCollapsed"
)

===

"true"

){

sidebar.classList.add(
"collapsed"
);

}

/* ====================================
   YOUTUBE BUTTON
==================================== */

document
.getElementById(
"youtubeBtn"
)
?.addEventListener(

"click",

()=>{

window.open(

"https://youtube.com",

"_blank"

);

}

);

/* ====================================
   PLATFORM DATA
==================================== */

const platforms = {

coding:[

{
name:"LeetCode",
icon:"🧩",
url:"https://leetcode.com"
},

{
name:"GitHub",
icon:"🌐",
url:"https://github.com"
},

{
name:"HackerRank",
icon:"🏆",
url:"https://hackerrank.com"
},

{
name:"Codeforces",
icon:"⚡",
url:"https://codeforces.com"
}

],

social:[

{
name:"Instagram",
icon:"📸",
url:"https://instagram.com"
},

{
name:"LinkedIn",
icon:"💼",
url:"https://linkedin.com"
},

{
name:"X",
icon:"🐦",
url:"https://x.com"
},

{
name:"Facebook",
icon:"📘",
url:"https://facebook.com"
}

],

jobs:[

{
name:"LinkedIn Jobs",
icon:"💼",
url:"https://linkedin.com/jobs"
},

{
name:"Naukri",
icon:"🇮🇳",
url:"https://naukri.com"
},

{
name:"Indeed",
icon:"📋",
url:"https://indeed.com"
}

],

entertainment:[

{
name:"Netflix",
icon:"🎬",
url:"https://netflix.com"
},

{
name:"Prime Video",
icon:"📺",
url:"https://primevideo.com"
},

{
name:"Spotify",
icon:"🎵",
url:"https://spotify.com"
},

{
name:"Hotstar",
icon:"⭐",
url:"https://hotstar.com"
}

],

shop:[

{
name:"Amazon",
icon:"📦",
url:"https://amazon.in"
},

{
name:"Flipkart",
icon:"🛒",
url:"https://flipkart.com"
},

{
name:"Myntra",
icon:"👕",
url:"https://myntra.com"
}

]

};

/* ====================================
   BUILD MENUS
==================================== */

function buildMenu(

menuId,
items

){

const menu =

document.getElementById(
menuId
);

if(!menu)
return;

menu.innerHTML = "";

items.forEach(item=>{

const div =
document.createElement(
"div"
);

div.className =
"submenu-item";

div.innerHTML =

`
${item.icon}
${item.name}
`;

div.addEventListener(

"click",

()=>{

window.open(

item.url,

"_blank"

);

}

);

menu.appendChild(
div
);

});

}

/* ====================================
   INIT MENUS
==================================== */

buildMenu(
"codingMenu",
platforms.coding
);

buildMenu(
"socialMenu",
platforms.social
);

buildMenu(
"jobMenu",
platforms.jobs
);

buildMenu(
"entertainmentMenu",
platforms.entertainment
);

buildMenu(
"shopMenu",
platforms.shop
);

/* ====================================
   ACTIVE NAV
==================================== */

document
.querySelectorAll(
".nav-item"
)
.forEach(item=>{

item.addEventListener(

"click",

()=>{

document
.querySelectorAll(
".nav-item"
)
.forEach(nav=>{

nav.classList.remove(
"active"
);

});

item.classList.add(
"active"
);

}

);

});

/* ====================================
   CREATOR MODE
==================================== */

document
.getElementById(
"changeColors"
)
?.addEventListener(

"click",

()=>{

const color =

prompt(

"Enter Hex Color",

"#ff003c"

);

if(!color)
return;

document
.documentElement
.style.setProperty(

"--red",

color

);

localStorage.setItem(
"spidyColor",
color
);

}

);

document
.getElementById(
"changeGlass"
)
?.addEventListener(

"click",

()=>{

const opacity =

prompt(

"Glass Opacity (0-1)",

"0.08"

);

if(!opacity)
return;

document
.documentElement
.style.setProperty(

"--glass-opacity",

opacity

);

localStorage.setItem(

"glassOpacity",

opacity

);

}

);

/* ====================================
   RESTORE CREATOR SETTINGS
==================================== */

const savedColor =

localStorage.getItem(
"spidyColor"
);

if(savedColor){

document
.documentElement
.style.setProperty(

"--red",

savedColor

);

}

const savedOpacity =

localStorage.getItem(
"glassOpacity"
);

if(savedOpacity){

document
.documentElement
.style.setProperty(

"--glass-opacity",

savedOpacity

);

}

/* ====================================
   READY
==================================== */

console.log(
"🕷 Sidebar V2 Loaded"
);