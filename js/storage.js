/* ====================================
   SPIDY STORAGE ENGINE
==================================== */

const Storage = {

    save(key, data){

        try{

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

            return true;

        }catch(error){

            console.error(
                "Storage Save Error:",
                error
            );

            return false;

        }

    },

    load(key){

        try{

            const data =
            localStorage.getItem(key);

            if(data === null)
            return null;

            return JSON.parse(data);

        }catch(error){

            console.error(
                "Storage Load Error:",
                error
            );

            return null;

        }

    },

    remove(key){

        localStorage.removeItem(key);

    },

    clear(){

        localStorage.clear();

    }

};

/* ====================================
   SETTINGS
==================================== */

const SettingsStorage = {

    saveTheme(theme){

        Storage.save(
            "spidy_theme",
            theme
        );

    },

    getTheme(){

        return Storage.load(
            "spidy_theme"
        ) || "dark";

    },

    saveWallpaper(image){

        Storage.save(
            "spidy_wallpaper",
            image
        );

    },

    getWallpaper(){

        return Storage.load(
            "spidy_wallpaper"
        );

    }

};

/* ====================================
   FOLDERS
==================================== */

const FolderStorage = {

    saveFolders(folders){

        Storage.save(
            "spidy_folders",
            folders
        );

    },

    getFolders(){

        return Storage.load(
            "spidy_folders"
        ) || [];

    }

};

/* ====================================
   QUICK NOTES
==================================== */

const NotesStorage = {

    save(content){

        Storage.save(
            "spidy_notes",
            content
        );

    },

    load(){

        return Storage.load(
            "spidy_notes"
        ) || "";

    }

};

/* ====================================
   QUICK TODO
==================================== */

const TodoStorage = {

    save(tasks){

        Storage.save(
            "spidy_todos",
            tasks
        );

    },

    load(){

        return Storage.load(
            "spidy_todos"
        ) || [];

    }

};

/* ====================================
   DASHBOARD LAYOUT
==================================== */

const LayoutStorage = {

    save(layout){

        Storage.save(
            "spidy_layout",
            layout
        );

    },

    load(){

        return Storage.load(
            "spidy_layout"
        ) || [];

    }

};

/* ====================================
   GITHUB SETTINGS
==================================== */

const GithubStorage = {

    saveUsername(username){

        Storage.save(
            "github_username",
            username
        );

    },

    getUsername(){

        return Storage.load(
            "github_username"
        ) || "";

    }

};

/* ====================================
   EXPORT
==================================== */

function exportSpidyData(){

    const data = {

        theme:
        SettingsStorage.getTheme(),

        wallpaper:
        SettingsStorage.getWallpaper(),

        folders:
        FolderStorage.getFolders(),

        notes:
        NotesStorage.load(),

        todos:
        TodoStorage.load(),

        github:
        GithubStorage.getUsername(),

        layout:
        LayoutStorage.load()

    };

    const blob =
    new Blob(

        [
            JSON.stringify(
                data,
                null,
                2
            )
        ],

        {
            type:
            "application/json"
        }

    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "spidy-backup.json";

    link.click();

}

/* ====================================
   IMPORT
==================================== */

function importSpidyData(data){

    if(data.theme)
    SettingsStorage.saveTheme(
        data.theme
    );

    if(data.wallpaper)
    SettingsStorage.saveWallpaper(
        data.wallpaper
    );

    if(data.folders)
    FolderStorage.saveFolders(
        data.folders
    );

    if(data.notes)
    NotesStorage.save(
        data.notes
    );

    if(data.todos)
    TodoStorage.save(
        data.todos
    );

    if(data.github)
    GithubStorage.saveUsername(
        data.github
    );

    if(data.layout)
    LayoutStorage.save(
        data.layout
    );

}