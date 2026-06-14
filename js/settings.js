/* ====================================
   SETTINGS PANEL
==================================== */

const settingsPanel =
document.getElementById(
    "settingsPanel"
);

const settingsBtn =
document.getElementById(
    "settingsBtn"
);

const wallpaperUpload =
document.getElementById(
    "wallpaperUpload"
);

const importInput =
document.getElementById(
    "importSettings"
);
const settingsClose =
document.getElementById(
    "settingsClose"
);

settingsClose?.addEventListener(
    "click",
    ()=>{

        settingsPanel.classList.remove(
            "open"
        );

    }
);
/* ====================================
   OPEN / CLOSE
==================================== */

settingsBtn?.addEventListener(
    "click",
    ()=>{

        settingsPanel.classList.toggle(
            "open"
        );

    }
);

document.addEventListener(
    "keydown",
    e=>{

        if(e.key === "Escape"){

            settingsPanel.classList.remove(
                "open"
            );

        }

    }
);
document.addEventListener(
    "click",
    e=>{

        if(

            settingsPanel.classList.contains(
                "open"
            ) &&

            !settingsPanel.contains(
                e.target
            ) &&

            !settingsBtn.contains(
                e.target
            )

        ){

            settingsPanel.classList.remove(
                "open"
            );

        }

    }
);
/* ====================================
   THEME SYSTEM
==================================== */

function setTheme(theme){

    document.body.dataset.theme =
    theme;

    SettingsStorage.saveTheme(
        theme
    );

    showToast(
        `Theme: ${theme}`
    );

}

function loadTheme(){

    const savedTheme =
    SettingsStorage.getTheme();

    document.body.dataset.theme =
    savedTheme;

}

loadTheme();

/* ====================================
   AUTO THEME
==================================== */

function enableAutoTheme(){

    const theme =
    detectThemeByTime();

    setTheme(theme);

}

function toggleAutoTheme(enabled){

    Storage.save(
        "auto_theme",
        enabled
    );

    if(enabled){

        enableAutoTheme();

    }

}

const autoTheme =
Storage.load(
    "auto_theme"
);

if(autoTheme){

    enableAutoTheme();

}

/* ====================================
   WALLPAPER SYSTEM
==================================== */

async function handleWallpaperUpload(file){

    if(!file)
    return;

    try{

        const image =
        await fileToDataUrl(
            file
        );

        applyWallpaper(
            image
        );

        SettingsStorage.saveWallpaper(
            image
        );

        showToast(
            "Wallpaper Updated"
        );

    }

    catch(error){

        console.error(error);

    }

}

function applyWallpaper(image){

    document.body.style.backgroundImage =
    `url("${image}")`;

    document.body.classList.add(
        "has-wallpaper"
    );

}

wallpaperUpload?.addEventListener(
    "change",
    e=>{

        const file =
        e.target.files[0];

        if(!file)
        return;

        const card =
        document.querySelector(
            ".upload-card"
        );

        card.innerHTML =

        `
        ✅ ${file.name}
        <span>
        Wallpaper Selected
        </span>
        `;

        handleWallpaperUpload(
            file
        );

    }
);
/* ====================================
   LOAD WALLPAPER
==================================== */

function loadWallpaper(){

    const wallpaper =
    SettingsStorage.getWallpaper();

    if(!wallpaper)
    return;

    applyWallpaper(
        wallpaper
    );

}

loadWallpaper();

/* ====================================
   REMOVE WALLPAPER
==================================== */

function removeWallpaper(){

    document.body.style.backgroundImage =
    "";

    document.body.classList.remove(
        "has-wallpaper"
    );

    Storage.remove(
        "spidy_wallpaper"
    );

    showToast(
        "Wallpaper Removed"
    );

}

/* ====================================
   EXPORT SETTINGS
==================================== */

function exportSettings(){

    exportSpidyData();

    showToast(
        "Backup Downloaded"
    );

}

/* ====================================
   IMPORT SETTINGS
==================================== */
const importCard =
document.querySelector(
    ".import-card"
);

importInput?.addEventListener(
    "change",
    e=>{

        const file =
        e.target.files[0];

        if(!file)
        return;

        importCard.innerHTML =

        `
        ✅ ${file.name}

        <span>

        Backup Ready

        </span>
        `;

    }
);
importInput?.addEventListener(
    "change",
    e=>{

        const file =
        e.target.files[0];

        if(!file)
        return;

        const reader =
        new FileReader();

        reader.onload =
        ()=>{

            const data =
            safeJsonParse(
                reader.result
            );

            if(!data){

                alert(
                    "Invalid Backup File"
                );

                return;

            }

            importSpidyData(
                data
            );

            location.reload();

        };

        reader.readAsText(
            file
        );

    }
);

/* ====================================
   FOLDER COLORS
==================================== */

function saveFolderColor(
    folderId,
    color
){

    const folders =
    FolderStorage.getFolders();

    const folder =
    folders.find(
        f=>f.id === folderId
    );

    if(!folder)
    return;

    folder.color =
    color;

    FolderStorage.saveFolders(
        folders
    );

}

/* ====================================
   AUTO TEXT COLOR
==================================== */

function getFolderTextColor(
    backgroundColor
){

    return getContrastColor(
        backgroundColor
    );

}

/* ====================================
   SETTINGS SHORTCUT
==================================== */

document.addEventListener(
    "keydown",
    e=>{

        if(
            e.ctrlKey &&
            e.key === ","
        ){

            e.preventDefault();

            settingsPanel.classList.toggle(
                "open"
            );

        }

    }
);

/* ====================================
   SPIDER-VERSE PRESETS
==================================== */

function applySpiderVerseTheme(){

    setTheme("dark");

}

function applyComicTheme(){

    setTheme("comic");

}

function applyNeonTheme(){

    setTheme("neon");

}

/* ====================================
   INITIALIZATION
==================================== */

console.log(
    "⚙ Settings Loaded"
);
function resetDashboard(){

    if(
        !confirm(
            "Reset entire dashboard?"
        )
    ) return;

    localStorage.clear();

    location.reload();

}