/* ====================================
   FOLDER ENGINE
==================================== */

const folderContainer =
document.getElementById(
    "folderContainer"
);

const addFolderBtn =
document.getElementById(
    "addFolderBtn"
);

let folders =
FolderStorage.getFolders();

/* ====================================
   CREATE FOLDER
==================================== */

function createFolder(){

    const name =
    prompt(
        "Folder Name"
    );

    if(!name)
    return;

    const type =
    prompt(
        "Folder Type\n\nlinks\nnotes\ntodo"
    );

    if(!type)
    return;

    const folder = {

        id:generateId(),

        name:name,

        type:type
        .toLowerCase(),

        items:[],

        color:"folder-blue",

        image:null

    };

    folders.push(folder);

    saveFolders();

    renderFolders();

}

/* ====================================
   SAVE
==================================== */

function saveFolders(){

    FolderStorage.saveFolders(
        folders
    );

}

/* ====================================
   DELETE
==================================== */

function deleteFolder(id){

    folders =
    folders.filter(

        folder=>

        folder.id !== id

    );

    saveFolders();

    renderFolders();

}

/* ====================================
   RENAME
==================================== */

function renameFolder(id){

    const folder =
    folders.find(

        f=>f.id===id

    );

    if(!folder)
    return;

    const name =
    prompt(
        "New Folder Name",
        folder.name
    );

    if(!name)
    return;

    folder.name =
    name;

    saveFolders();

    renderFolders();

}

/* ====================================
   CHANGE COLOR
==================================== */

function changeFolderColor(id){

    const folder =
    folders.find(

        f=>f.id===id

    );

    if(!folder)
    return;

    const color =
    prompt(

        "folder-red\nfolder-blue\nfolder-green\nfolder-purple\nfolder-orange",

        folder.color

    );

    if(!color)
    return;

    folder.color =
    color;

    saveFolders();

    renderFolders();

}

/* ====================================
   ADD LINK
==================================== */

function addLink(folderId){

    const folder =
    folders.find(

        f=>f.id===folderId

    );

    if(!folder)
    return;

    const title =
    prompt(
        "Link Name"
    );

    const url =
    prompt(
        "Link URL"
    );

    if(
        !title ||
        !url
    )
    return;

    folder.items.push({

        title:title,

        url:url

    });

    saveFolders();

    renderFolders();

}

/* ====================================
   DELETE LINK
==================================== */

function deleteLink(
    folderId,
    index
){

    const folder =
    folders.find(

        f=>f.id===folderId

    );

    folder.items.splice(
        index,
        1
    );

    saveFolders();

    renderFolders();

}

/* ====================================
   SAVE NOTE
==================================== */

function saveNote(
    folderId,
    value
){

    const folder =
    folders.find(

        f=>f.id===folderId

    );

    folder.items = [
        value
    ];

    saveFolders();

}

/* ====================================
   ADD TASK
==================================== */

function addTask(folderId){

    const task =
    prompt(
        "Task"
    );

    if(!task)
    return;

    const folder =
    folders.find(

        f=>f.id===folderId

    );

    folder.items.push({

        text:task,

        done:false

    });

    saveFolders();

    renderFolders();

}

/* ====================================
   TOGGLE TASK
==================================== */

function toggleTask(
    folderId,
    index
){

    const folder =
    folders.find(

        f=>f.id===folderId

    );

    folder.items[index].done =

    !folder.items[index].done;

    saveFolders();

}

/* ====================================
   DELETE TASK
==================================== */

function deleteTask(
    folderId,
    index
){

    const folder =
    folders.find(

        f=>f.id===folderId

    );

    folder.items.splice(
        index,
        1
    );

    saveFolders();

    renderFolders();

}

/* ====================================
   RENDER LINKS
==================================== */

function renderLinks(folder){

    let html =

    `
    <button
    class="folder-add-btn"
    onclick="addLink('${folder.id}')">

    + Add Link

    </button>
    `;

    folder.items.forEach(

        (link,index)=>{

            html +=

            `
            <div class="link-item">

                <a
                href="${link.url}"
                target="_blank">

                ${link.title}

                </a>

                <button
                onclick="deleteLink('${folder.id}',${index})">

                ❌

                </button>

            </div>
            `;

        }

    );

    return html;

}

/* ====================================
   RENDER NOTES
==================================== */

function renderNotes(folder){

    return

    `
    <textarea

    class="note-box"

    oninput="saveNote('${folder.id}',this.value)"

    >

    ${folder.items[0] || ""}

    </textarea>
    `;

}

/* ====================================
   RENDER TODO
==================================== */

function renderTodo(folder){

    let html =

    `
    <button

    class="folder-add-btn"

    onclick="addTask('${folder.id}')">

    + Add Task

    </button>
    `;

    folder.items.forEach(

        (task,index)=>{

            html +=

            `
            <div

            class="todo-item

            ${task.done ? "completed" : ""}"

            >

            <input

            type="checkbox"

            ${task.done ? "checked" : ""}

            onchange="toggleTask('${folder.id}',${index})"

            >

            <span>

            ${task.text}

            </span>

            <button

            onclick="deleteTask('${folder.id}',${index})"

            >

            ❌

            </button>

            </div>
            `;

        }

    );

    return html;

}

/* ====================================
   CONTENT ROUTER
==================================== */

function renderFolderContent(folder){

    switch(folder.type){

        case "links":

            return renderLinks(folder);

        case "notes":

            return renderNotes(folder);

        case "todo":

            return renderTodo(folder);

        default:

            return
            "Unknown Folder";

    }

}

/* ====================================
   MAIN RENDER
==================================== */

function renderFolders(){

    folderContainer.innerHTML = "";

    folders.forEach(folder=>{

        const div =
        document.createElement(
            "div"
        );

        div.className =
        `folder ${folder.color}`;

        div.innerHTML =

        `
        <div class="folder-header">

            <div>

                <div class="folder-title">

                ${folder.name}

                </div>

                <div class="folder-type">

                ${folder.type}

                </div>

            </div>

            <div class="folder-actions">

                <button
                onclick="renameFolder('${folder.id}')">

                ✏

                </button>

                <button
                onclick="changeFolderColor('${folder.id}')">

                🎨

                </button>

                <button
                onclick="deleteFolder('${folder.id}')">

                🗑

                </button>

            </div>

        </div>

        <div class="folder-content">

        ${renderFolderContent(folder)}

        </div>
        `;

        folderContainer.appendChild(
            div
        );

    });

}

/* ====================================
   INIT
==================================== */

addFolderBtn?.addEventListener(

    "click",

    createFolder

);

renderFolders();

console.log(
    "📁 Folder System Loaded"
);