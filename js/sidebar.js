import {
    loadSidebar,
    saveSidebar
}
from "./sidebar-storage.js";

import {
    renderTree
}
from "./sidebar-tree.js";

let sidebarData =
loadSidebar();

const container =
document.getElementById(
    "sidebarDynamic"
);

function renderSidebar() {

    container.innerHTML = "";

    sidebarData.user.forEach(
        category => {

            renderTree(
                category,
                container
            );

        }
    );

}
function createCategory(name){

    return {

        id: crypto.randomUUID(),
        type: "category",
        icon: "📁",
        name,
        children: []

    };

}

function createFolder(name){

    return {

        id: crypto.randomUUID(),
        type: "folder",
        icon: "📁",
        name,
        children: []

    };

}

function createLink(name,url){

    return {

        id: crypto.randomUUID(),
        type: "link",
        icon: "🔗",
        name,
        url

    };

}
document
.getElementById(
"addCategoryBtn"
)
.addEventListener(
"click",
()=>{

    const name =
    prompt(
        "Category Name"
    );

    if(!name)
    return;

    sidebarData.user.push(
    createCategory(name)
);

    saveSidebar(
        sidebarData
    );

    renderSidebar();

});

renderSidebar();
window.renderSidebar =
renderSidebar;

window.sidebarData =
sidebarData;

window.saveSidebar =
() => {

    saveSidebar(
        sidebarData
    );

};
