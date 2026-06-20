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
type:"folder",
icon:"🚀",
name:"Startup Jobs",
children:[
{
type:"link",
icon:"💼",
name:"YC Jobs",
url:"https://www.ycombinator.com/jobs"
},
{
type:"link",
icon:"🦄",
name:"Wellfound",
url:"https://wellfound.com"
}
]
},

{
type:"folder",
icon:"🌍",
name:"Remote Jobs",
children:[]
},

{
type:"folder",
icon:"💻",
name:"Freelance",
children:[]
},

{
type:"add-category",
icon:"➕",
name:"Add Category"
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

function buildMenu(menuId, items){

    const menu =
    document.getElementById(menuId);

    if(!menu) return;

    menu.innerHTML = "";

    items.forEach(item=>{

        const div =
        document.createElement("div");

        div.className =
        "submenu-item";

        // ADD CATEGORY
        if(item.type==="add-category"){

            div.innerHTML =
            `${item.icon} ${item.name}`;

            div.addEventListener("click",()=>{

                const name =
                prompt("Category Name");

                if(!name) return;

                items.splice(
                    items.length-1,
                    0,
                    {
                        type:"folder",
                        icon:"📁",
                        name,
                        children:[]
                    }
                );

                buildMenu(
                    menuId,
                    items
                );

            });

            menu.appendChild(div);
            return;
        }

        // FOLDER
        if(item.type==="folder"){

            div.classList.add(
                "folder-item"
            );

            div.innerHTML =
            `
            <span>
                ${item.icon}
                ${item.name}
            </span>

            <span>▶</span>
            `;

            const nested =
            document.createElement(
                "div"
            );

            nested.className =
            "nested-submenu";

            div.appendChild(
                nested
            );

            buildNestedMenu(
                nested,
                item
            );

            menu.appendChild(div);

            return;
        }

        // LINK
        div.innerHTML =
        `
        ${item.icon}
        ${item.name}
        `;

        div.addEventListener(
            "click",
            ()=>window.open(
                item.url,
                "_blank"
            )
        );

        menu.appendChild(div);

    });

}

function buildNestedMenu(
container,
folder
){

    container.innerHTML="";

    folder.children.forEach(item=>{

        const div =
        document.createElement(
            "div"
        );

        div.className =
        "submenu-item";

        if(item.type==="link"){

            div.innerHTML =
            `${item.icon} ${item.name}`;

            div.addEventListener(
                "click",
                ()=>window.open(
                    item.url,
                    "_blank"
                )
            );

        }

        container.appendChild(
            div
        );

    });

    const addLink =
    document.createElement(
        "div"
    );

    addLink.className =
    "submenu-item";

    addLink.innerHTML =
    "➕ Add Link";

    addLink.addEventListener(
        "click",
        ()=>{

            const name =
            prompt("Link Name");

            if(!name) return;

            const url =
            prompt("URL");

            if(!url) return;

            folder.children.push({

                type:"link",
                icon:"🔗",
                name,
                url

            });

            buildNestedMenu(
                container,
                folder
            );

        }
    );

    container.appendChild(
        addLink
    );

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