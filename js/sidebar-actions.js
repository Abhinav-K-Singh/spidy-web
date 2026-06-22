export function attachNodeActions(
    element,
    node,
    sidebarData,
    saveFn,
    renderFn
){

    const menu =
    element.querySelector(".node-menu");

    if(!menu) return;

    menu.addEventListener("click",(e)=>{

        e.stopPropagation();

        const action = prompt(
`1 Rename
2 Add Folder
3 Add Link
4 Delete`
        );

        switch(action){

            case "1":

                renameNode();
                break;

            case "2":

                addFolder();
                break;

            case "3":

                addLink();
                break;

            case "4":

                deleteNode();
                break;

        }

    });

    function renameNode(){

        const name =
        prompt(
            "Rename",
            node.name
        );

        if(!name) return;

        node.name = name;

        saveFn();
        renderFn();

    }

    function addFolder(){

        if(!node.children) return;

        const name =
        prompt(
            "Folder Name"
        );

        if(!name) return;

        node.children.push({

            id: crypto.randomUUID(),

            type: "folder",

            icon: "📁",

            name,

            children: []

        });

        saveFn();
        renderFn();

    }

    function addLink(){

        if(!node.children) return;

        const name =
        prompt(
            "Link Name"
        );

        if(!name) return;

        const url =
        prompt(
            "URL"
        );

        if(!url) return;

        node.children.push({

            id: crypto.randomUUID(),

            type: "link",

            icon: "🔗",

            name,

            url

        });

        saveFn();
        renderFn();

    }

    function deleteNode(){

        const confirmed =
        confirm(
            `Delete ${node.name}?`
        );

        if(!confirmed) return;

        removeNode(
            sidebarData.user,
            node.id
        );

        saveFn();
        renderFn();

    }

    function removeNode(
        nodes,
        targetId
    ){

        for(
            let i=0;
            i<nodes.length;
            i++
        ){

            if(
                nodes[i].id === targetId
            ){

                nodes.splice(
                    i,
                    1
                );

                return true;

            }

            if(
                nodes[i].children
            ){

                const found =
                removeNode(
                    nodes[i].children,
                    targetId
                );

                if(found)
                return true;

            }

        }

        return false;

    }

}