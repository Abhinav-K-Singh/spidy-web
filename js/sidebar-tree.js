import {
    attachNodeActions
}
from "./sidebar-actions.js";
export function renderTree(
    node,
    parent
) {

    const item =
    document.createElement("div");

    item.className =
    "dynamic-category";

 const isLink =
node.type === "link";

item.innerHTML = `

<div class="dynamic-header">

    <span>

        ${node.icon || "📁"}

        ${node.name}

    </span>

    <span>

        ${
            isLink
            ? "↗"
            : "▶"
        }

        <span class="node-menu">

            ⋮

        </span>

    </span>

</div>

`;

parent.appendChild(item);

attachNodeActions(
    item,
    node,
    window.sidebarData,
    window.saveSidebar,
    window.renderSidebar
);
if(
    node.type === "link"
){

    item
    .querySelector(
        ".dynamic-header"
    )
    ?.addEventListener(
        "click",
        ()=>{

            window.open(
                node.url,
                "_blank"
            );

        }
    );

}
    if (
        node.children &&
        node.children.length
    ) {

        const submenu =
        document.createElement("div");

        submenu.className =
        "dynamic-submenu";

        item.appendChild(submenu);

        node.children.forEach(child => {

            renderTree(
                child,
                submenu
            );

        });

    }
}