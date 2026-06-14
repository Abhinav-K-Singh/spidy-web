/* ====================================
   DRAG & DROP ENGINE
==================================== */

const dashboardGrid =
document.getElementById(
    "dashboard-grid"
);

/* ====================================
   DRAG STATE
==================================== */

let draggedWidget = null;

/* ====================================
   MAKE WIDGETS DRAGGABLE
==================================== */

function initializeDragDrop(){

    const widgets =

    document.querySelectorAll(
        ".widget"
    );

    widgets.forEach(

        (widget,index)=>{

            widget.setAttribute(
                "draggable",
                true
            );

            widget.dataset.index =
            index;

            widget.addEventListener(
                "dragstart",
                dragStart
            );

            widget.addEventListener(
                "dragend",
                dragEnd
            );

            widget.addEventListener(
                "dragover",
                dragOver
            );

            widget.addEventListener(
                "drop",
                dropWidget
            );

            widget.addEventListener(
                "dragenter",
                dragEnter
            );

            widget.addEventListener(
                "dragleave",
                dragLeave
            );

        }

    );

}

/* ====================================
   START
==================================== */

function dragStart(e){

    draggedWidget =
    this;

    this.classList.add(
        "dragging"
    );

    e.dataTransfer.effectAllowed =
    "move";

}

/* ====================================
   END
==================================== */

function dragEnd(){

    this.classList.remove(
        "dragging"
    );

    document
    .querySelectorAll(
        ".widget"
    )
    .forEach(widget=>{

        widget.classList.remove(
            "drag-over"
        );

    });

    saveLayout();

}

/* ====================================
   OVER
==================================== */

function dragOver(e){

    e.preventDefault();

}

/* ====================================
   ENTER
==================================== */

function dragEnter(e){

    e.preventDefault();

    if(
        this !== draggedWidget
    ){

        this.classList.add(
            "drag-over"
        );

    }

}

/* ====================================
   LEAVE
==================================== */

function dragLeave(){

    this.classList.remove(
        "drag-over"
    );

}

/* ====================================
   DROP
==================================== */

function dropWidget(e){

    e.preventDefault();

    this.classList.remove(
        "drag-over"
    );

    if(
        this === draggedWidget
    ){

        return;

    }

    const widgets =

    [...dashboardGrid.children];

    const draggedIndex =

    widgets.indexOf(
        draggedWidget
    );

    const targetIndex =

    widgets.indexOf(
        this
    );

    if(
        draggedIndex <
        targetIndex
    ){

        this.after(
            draggedWidget
        );

    }

    else{

        this.before(
            draggedWidget
        );

    }

    saveLayout();

}

/* ====================================
   SAVE LAYOUT
==================================== */

function saveLayout(){

    const widgets =

    document.querySelectorAll(
        "#dashboard-grid > .widget"
    );

    const layout = [];

    widgets.forEach(widget=>{

        layout.push(

            widget.querySelector(
                "h3,h2"
            )?.innerText ||

            widget.id ||

            "widget"

        );

    });

    LayoutStorage.save(
        layout
    );

}

/* ====================================
   LOAD LAYOUT
==================================== */

function loadLayout(){

    const layout =

    LayoutStorage.load();

    if(
        !layout ||
        !layout.length
    ){

        return;

    }

    const widgets =

    [...dashboardGrid.children];

    const map = {};

    widgets.forEach(widget=>{

        const key =

        widget.querySelector(
            "h3,h2"
        )?.innerText ||

        widget.id ||

        "widget";

        map[key] = widget;

    });

    layout.forEach(key=>{

        if(map[key]){

            dashboardGrid.appendChild(
                map[key]
            );

        }

    });

}

/* ====================================
   RESET LAYOUT
==================================== */

function resetLayout(){

    Storage.remove(
        "spidy_layout"
    );

    location.reload();

}

/* ====================================
   KEYBOARD SHORTCUT
==================================== */

document.addEventListener(

    "keydown",

    e=>{

        if(

            e.ctrlKey &&

            e.shiftKey &&

            e.key === "R"

        ){

            e.preventDefault();

            const confirmReset =

            confirm(
                "Reset Dashboard Layout?"
            );

            if(confirmReset){

                resetLayout();

            }

        }

    }

);

/* ====================================
   WIDGET ANIMATION
==================================== */

function animateWidgets(){

    const widgets =

    document.querySelectorAll(
        ".widget"
    );

    widgets.forEach(

        (widget,index)=>{

            widget.style.animationDelay =

            `${index * 0.05}s`;

        }

    );

}

/* ====================================
   INIT
==================================== */

window.addEventListener(

    "load",

    ()=>{

        loadLayout();

        initializeDragDrop();

        animateWidgets();

    }

);

console.log(
    "🖱 Drag & Drop Loaded"
);