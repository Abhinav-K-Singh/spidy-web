/* ====================================
   COMMAND PALETTE
==================================== */

const commandPalette =
document.getElementById(
    "commandPalette"
);

const commandInput =
document.getElementById(
    "commandInput"
);

/* ====================================
   COMMANDS
==================================== */

const Commands = [

{
name:"theme dark",
action:()=>setTheme("dark")
},

{
name:"theme light",
action:()=>setTheme("light")
},

{
name:"theme comic",
action:()=>setTheme("comic")
},

{
name:"theme neon",
action:()=>setTheme("neon")
},

{
name:"create folder",
action:()=>createFolder()
},

{
name:"open github",
action:()=>window.open(
"https://github.com",
"_blank"
)
},

{
name:"open youtube",
action:()=>window.open(
"https://youtube.com",
"_blank"
)
},

{
name:"open chatgpt",
action:()=>window.open(
"https://chatgpt.com",
"_blank"
)
},

{
name:"open canva",
action:()=>window.open(
"https://canva.com",
"_blank"
)
},

{
name:"export backup",
action:()=>exportSettings()
},

{
name:"reset layout",
action:()=>resetLayout()
},

{
name:"remove wallpaper",
action:()=>removeWallpaper()
}

];

/* ====================================
   OPEN
==================================== */

function openCommandPalette(){

    commandPalette.classList.add(
        "active"
    );

    commandInput.value = "";

    commandInput.focus();

}

/* ====================================
   CLOSE
==================================== */

function closeCommandPalette(){

    commandPalette.classList.remove(
        "active"
    );

}

/* ====================================
   CTRL + K
==================================== */

document.addEventListener(

    "keydown",

    e=>{

        if(

            e.ctrlKey &&
            e.key.toLowerCase()==="k"

        ){

            e.preventDefault();

            openCommandPalette();

        }

    }

);

/* ====================================
   ESC CLOSE
==================================== */

document.addEventListener(

    "keydown",

    e=>{

        if(
            e.key==="Escape"
        ){

            closeCommandPalette();

        }

    }

);

/* ====================================
   SEARCH
==================================== */

commandInput?.addEventListener(

    "input",

    ()=>{

        const query =

        commandInput.value
        .toLowerCase()
        .trim();

        const results =

        Commands.filter(

            command=>

            command.name
            .includes(query)

        );

        renderResults(
            results
        );

    }

);

/* ====================================
   RESULTS UI
==================================== */

function renderResults(results){

    let resultBox =

    document.getElementById(
        "commandResults"
    );

    if(!resultBox){

        resultBox =
        document.createElement(
            "div"
        );

        resultBox.id =
        "commandResults";

        commandPalette.appendChild(
            resultBox
        );

    }

    if(results.length===0){

        resultBox.innerHTML =

        `
        <div class="command-item">
        No Command Found
        </div>
        `;

        return;

    }

    resultBox.innerHTML = "";

    results.forEach(command=>{

        const div =
        document.createElement(
            "div"
        );

        div.className =
        "command-item";

        div.innerText =
        command.name;

        div.onclick = ()=>{

            command.action();

            closeCommandPalette();

        };

        resultBox.appendChild(
            div
        );

    });

}

/* ====================================
   ENTER EXECUTE
==================================== */

commandInput?.addEventListener(

    "keydown",

    e=>{

        if(
            e.key !== "Enter"
        )
        return;

        const query =

        commandInput.value
        .trim()
        .toLowerCase();

        const command =

        Commands.find(

            c=>c.name===query

        );

        if(command){

            command.action();

            closeCommandPalette();

        }

    }

);

/* ====================================
   STYLE
==================================== */

const commandStyle =

document.createElement(
    "style"
);

commandStyle.innerHTML =

`
.command-palette{

position:fixed;

top:80px;

left:50%;

transform:translateX(-50%);

width:700px;

max-width:95%;

background:
rgba(10,12,18,.95);

backdrop-filter:
blur(20px);

border-radius:20px;

padding:20px;

z-index:9999;

box-shadow:
0 20px 50px rgba(0,0,0,.5);

display:none;

}

.command-palette.active{

display:block;

}

#commandInput{

width:100%;

padding:16px;

border:none;

outline:none;

border-radius:14px;

font-size:16px;

}

#commandResults{

margin-top:15px;

display:flex;

flex-direction:column;

gap:8px;

}

.command-item{

padding:12px;

border-radius:12px;

cursor:pointer;

background:
rgba(255,255,255,.05);

}

.command-item:hover{

background:
rgba(255,255,255,.10);

}
`;

document.head.appendChild(
    commandStyle
);

/* ====================================
   INIT
==================================== */

console.log(
    "⚡ Command Palette Loaded"
);