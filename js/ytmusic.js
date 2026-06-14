/* ====================================
   YT MUSIC WIDGET
==================================== */

const musicWidget =
document.getElementById(
    "spotifyWidget"
);

/* ====================================
   DEFAULT PLAYLIST
==================================== */

const DEFAULT_PLAYLIST =

"https://music.youtube.com/watch?v=jfKfPfyJRdk";

/* ====================================
   CONVERT URL
==================================== */

function getEmbedUrl(url){

    try{

        if(url.includes("watch?v=")){

            const id =
            url.split("watch?v=")[1]
            .split("&")[0];

            return
            `https://www.youtube.com/embed/${id}`;

        }

        return null;

    }

    catch{

        return null;

    }

}

/* ====================================
   LOAD PLAYER
==================================== */

function loadYTMusic(){

    const url =

    Storage.load(
        "ytmusic_url"
    ) ||

    DEFAULT_PLAYLIST;

    renderYTMusic(
        url
    );

}

/* ====================================
   RENDER
==================================== */

function renderYTMusic(url){

    const embedUrl =
    getEmbedUrl(url);

    if(!embedUrl){

        musicWidget.innerHTML =

        `
        Invalid YouTube URL
        `;

        return;

    }

    musicWidget.innerHTML =

    `
    <iframe

    width="100%"

    height="320"

    src="${embedUrl}"

    title="YT Music"

    frameborder="0"

    allowfullscreen

    >

    </iframe>

    <div class="yt-actions">

        <button
        onclick="changeYTMusic()">

        Change Music

        </button>

    </div>

    `;

}

/* ====================================
   CHANGE URL
==================================== */

function changeYTMusic(){

    const url = prompt(

        "Paste YouTube Music / YouTube URL"

    );

    if(!url)
    return;

    Storage.save(

        "ytmusic_url",

        url

    );

    renderYTMusic(
        url
    );

    showToast(
        "Music Updated"
    );

}

/* ====================================
   PRESETS
==================================== */

const MusicPresets = {

    lofi:
    "https://www.youtube.com/watch?v=jfKfPfyJRdk",

    coding:
    "https://www.youtube.com/watch?v=4xDzrJKXOOY",

    synthwave:
    "https://www.youtube.com/watch?v=MVPTGNGiI-4",

    travel:
    "https://www.youtube.com/watch?v=DWcJFNfaw9c"

};

/* ====================================
   LOAD PRESET
==================================== */

function loadMusicPreset(type){

    const url =
    MusicPresets[type];

    if(!url)
    return;

    Storage.save(
        "ytmusic_url",
        url
    );

    renderYTMusic(
        url
    );

}

/* ====================================
   MINI MODE
==================================== */

function toggleMiniPlayer(){

    const iframe =
    musicWidget.querySelector(
        "iframe"
    );

    if(!iframe)
    return;

    iframe.height =

    iframe.height === "320"
    ? "150"
    : "320";

}

/* ====================================
   STYLE
==================================== */

const style =
document.createElement(
    "style"
);

style.innerHTML =

`
.yt-actions{

display:flex;

justify-content:center;

margin-top:10px;

}

.yt-actions button{

padding:10px 16px;

}
`;

document.head.appendChild(
    style
);

/* ====================================
   INIT
==================================== */

loadYTMusic();

console.log(
    "🎵 YouTube Music Loaded"
);