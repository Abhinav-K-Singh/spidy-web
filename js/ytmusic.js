/* ====================================
SPIDY MUSIC HUB V2
==================================== */

const YT_API_KEY = "AIzaSyBhhEtNh-A2WQYCxzjRiNMks4ASWTgWrYw";

/* ====================================
ELEMENTS
==================================== */

const musicSearch = document.getElementById("musicSearch");
const playSongBtn = document.getElementById("playSong");

const songThumbnail = document.getElementById("songThumbnail");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

const musicStatus = document.querySelector(".music-status");

const randomBtn = document.getElementById("randomSong");
const favoriteBtn = document.getElementById("favoriteSong");
const historyBtn = document.getElementById("historySong");

const pauseBtn = document.getElementById("pauseSong");
const prevBtn = document.getElementById("prevSong");
const nextBtn = document.getElementById("nextSong");

/* ====================================
PLAYER
==================================== */

let player = null;
let playerReady = false;

let currentVideoId = "";
let currentSong = "";

let paused = false;

/* ====================================
STORAGE
==================================== */

let favorites =
JSON.parse(
localStorage.getItem("musicFavorites") || "[]"
);

let history =
JSON.parse(
localStorage.getItem("musicHistory") || "[]"
);

/* ====================================
SONG POOL
==================================== */

const randomSongs = [

"Faded Alan Walker",
"The Spectre",
"Alone Alan Walker",
"Believer Imagine Dragons",
"Starboy",
"Blinding Lights",
"Heat Waves",
"Perfect Ed Sheeran",
"Night Changes",
"Closer",
"Animals Martin Garrix",
"Unity TheFatRat",
"Legends Never Die"

];

/* ====================================
YOUTUBE PLAYER API
==================================== */

function onYouTubeIframeAPIReady(){

player = new YT.Player(

"youtubePlayer",

{

height:"1",
width:"1",

playerVars:{

autoplay:1,
controls:0,
rel:0

},

events:{

onReady:()=>{

playerReady = true;

console.log(
"🎵 Player Ready"
);

},

onStateChange:
onPlayerStateChange

}

}

);

}

window.onYouTubeIframeAPIReady =
onYouTubeIframeAPIReady;

/* ====================================
PLAYER STATE
==================================== */

function onPlayerStateChange(event){

const widget =
document.querySelector(
".music-widget"
);

if(!widget)
return;

if(
event.data ===
YT.PlayerState.PLAYING
){

widget.classList.remove(
"music-paused"
);

}

if(
event.data ===
YT.PlayerState.PAUSED
){

widget.classList.add(
"music-paused"
);

}

}

/* ====================================
SEARCH
==================================== */

async function searchYouTube(song){

try{

musicStatus.textContent =
"Searching...";

const response =
await fetch(

`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=1&q=${encodeURIComponent(song)}&key=${YT_API_KEY}`

);

const data =
await response.json();

if(
!data.items ||
!data.items.length
){

musicStatus.textContent =
"Not Found";

return;

}

const video =
data.items[0];

currentSong =
video.snippet.title;

currentVideoId =
video.id.videoId;

displaySong(video);

saveHistory(
video.snippet.title
);

}
catch(error){

console.error(error);

musicStatus.textContent =
"API Error";

}

}

/* ====================================
DISPLAY
==================================== */

function displaySong(video){

songThumbnail.src =
video.snippet.thumbnails.high.url;

songTitle.textContent =
video.snippet.title;

songArtist.textContent =
video.snippet.channelTitle;

musicStatus.textContent =
"Ready";

playVideo(
video.id.videoId
);

}

/* ====================================
PLAY VIDEO
==================================== */

function playVideo(videoId){

if(
!playerReady ||
!player
)
return;

currentVideoId =
videoId;

player.loadVideoById(
videoId
);

paused = false;

if(pauseBtn){

pauseBtn.textContent =
"⏸";

}

}

/* ====================================
FAVORITES
==================================== */

function saveFavorite(){

if(!currentSong)
return;

if(
favorites.includes(
currentSong
)
)
return;

favorites.push(
currentSong
);

localStorage.setItem(

"musicFavorites",

JSON.stringify(
favorites
)

);

alert(
"❤️ Added To Favorites"
);

}

/* ====================================
HISTORY
==================================== */

function saveHistory(song){

history.unshift(song);

history =
history.slice(0,15);

localStorage.setItem(

"musicHistory",

JSON.stringify(
history
)

);

}

function showHistory(){

alert(

history.length

?

history.join("\n")

:

"No History"

);

}

function showFavorites(){

alert(

favorites.length

?

favorites.join("\n")

:

"No Favorites"

);

}

/* ====================================
RANDOM
==================================== */

function playRandomSong(){

const song =

randomSongs[

Math.floor(
Math.random()
*
randomSongs.length
)

];

musicSearch.value =
song;

searchYouTube(song);

}

/* ====================================
CONTROLS
==================================== */

pauseBtn?.addEventListener(

"click",

()=>{

if(
!playerReady ||
!player
)
return;

if(paused){

player.playVideo();

pauseBtn.textContent =
"⏸";

}
else{

player.pauseVideo();

pauseBtn.textContent =
"▶";

}

paused = !paused;

}

);

prevBtn?.addEventListener(

"click",

()=>{

if(
history.length < 2
)
return;

history.shift();

const previousSong =
history[0];

musicSearch.value =
previousSong;

searchYouTube(
previousSong
);

}

);

nextBtn?.addEventListener(

"click",

playRandomSong

);

/* ====================================
SEARCH BUTTON
==================================== */

playSongBtn?.addEventListener(

"click",

()=>{

const song =
musicSearch.value.trim();

if(!song)
return;

searchYouTube(song);

}

);

musicSearch?.addEventListener(

"keypress",

e=>{

if(
e.key === "Enter"
){

playSongBtn.click();

}

}

);

/* ====================================
SHORTCUTS
==================================== */

randomBtn?.addEventListener(
"click",
playRandomSong
);

favoriteBtn?.addEventListener(
"click",
saveFavorite
);

historyBtn?.addEventListener(
"click",
showHistory
);

/* ====================================
INIT
==================================== */

window.addEventListener(

"load",

()=>{

setTimeout(()=>{

searchYouTube(
"Faded Alan Walker"
);

},1500);

}

);

console.log(
"🎵 Spidy Music Hub V2 Loaded"
);
