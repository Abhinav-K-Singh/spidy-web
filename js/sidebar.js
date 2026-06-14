/* ====================================
   SIDEBAR CONTROLLER
==================================== */

const sidebar =
document.getElementById(
    "sidebar"
);

const sidebarToggle =
document.getElementById(
    "sidebar-toggle"
);

const navItems =
document.querySelectorAll(
    ".nav-item"
);

/* ====================================
   LOAD SAVED STATE
==================================== */

loadSidebarState();

function loadSidebarState(){

    const collapsed =
    Storage.load(
        "sidebar_collapsed"
    );

    if(collapsed){

        sidebar.classList.add(
            "collapsed"
        );

    }

}

/* ====================================
   COLLAPSE TOGGLE
==================================== */

sidebarToggle.addEventListener(
    "click",
    ()=>{

        sidebar.classList.toggle(
            "collapsed"
        );

        Storage.save(
            "sidebar_collapsed",

            sidebar.classList.contains(
                "collapsed"
            )
        );

    }
);

/* ====================================
   ACTIVE NAVIGATION
==================================== */

loadActiveNav();

function loadActiveNav(){

    const active =
    Storage.load(
        "active_nav"
    ) || "Dashboard";

    navItems.forEach(item=>{

        const text =
        item.innerText.trim();

        if(
            text.includes(active)
        ){

            item.classList.add(
                "active"
            );

        }

    });

}

navItems.forEach(item=>{

    item.addEventListener(
        "click",
        ()=>{

            navItems.forEach(nav=>{

                nav.classList.remove(
                    "active"
                );

            });

            item.classList.add(
                "active"
            );

            Storage.save(
                "active_nav",

                item.innerText.trim()
            );

            handleNavigation(
                item.innerText.trim()
            );

        }
    );

});

/* ====================================
   NAVIGATION ROUTER
==================================== */

function handleNavigation(name){

    const folderContainer =
    document.getElementById(
        "folderContainer"
    );

    switch(true){

        case name.includes(
            "Dashboard"
        ):

            scrollToTop();
            break;

        case name.includes(
            "GitHub"
        ):

            document
            .getElementById(
                "githubUsername"
            )
            ?.focus();

            break;

        case name.includes(
            "Notes"
        ):

            document
            .getElementById(
                "quickNotes"
            )
            ?.focus();

            break;

        case name.includes(
            "Todo"
        ):

            document
            .getElementById(
                "quickTodo"
            )
            ?.scrollIntoView({

                behavior:
                "smooth"

            });

            break;

        case name.includes(
            "Settings"
        ):

            document
            .getElementById(
                "settingsBtn"
            )
            ?.click();

            break;

    }

}

/* ====================================
   MOBILE SIDEBAR
==================================== */

function toggleMobileSidebar(){

    sidebar.classList.toggle(
        "open"
    );

}

document.addEventListener(
    "click",
    e=>{

        if(

            window.innerWidth < 900 &&

            !sidebar.contains(
                e.target
            ) &&

            !e.target.closest(
                "#sidebar-toggle"
            )

        ){

            sidebar.classList.remove(
                "open"
            );

        }

    }
);

/* ====================================
   SCROLL TO TOP
==================================== */

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:
        "smooth"

    });

}

/* ====================================
   KEYBOARD SHORTCUTS
==================================== */

document.addEventListener(
    "keydown",
    e=>{

        if(

            e.ctrlKey &&
            e.key === "b"

        ){

            e.preventDefault();

            sidebar.classList.toggle(
                "collapsed"
            );

            Storage.save(

                "sidebar_collapsed",

                sidebar.classList.contains(
                    "collapsed"
                )

            );

        }

    }
);

/* ====================================
   SIDEBAR TOOLTIPS
==================================== */

function setupTooltips(){

    navItems.forEach(item=>{

        item.setAttribute(

            "title",

            item.innerText.trim()

        );

    });

}

setupTooltips();

/* ====================================
   AUTO COLLAPSE ON SMALL SCREENS
==================================== */

function checkScreenSize(){

    if(
        window.innerWidth < 1200
    ){

        sidebar.classList.add(
            "collapsed"
        );

    }

}

checkScreenSize();

window.addEventListener(
    "resize",
    checkScreenSize
);

/* ====================================
   SPIDER NAV EFFECT
==================================== */

navItems.forEach(item=>{

    item.addEventListener(
        "mouseenter",
        ()=>{

            item.style.transform =
            "translateX(6px)";

        }
    );

    item.addEventListener(
        "mouseleave",
        ()=>{

            item.style.transform =
            "";

        }
    );

});

/* ====================================
   INITIALIZE
==================================== */

console.log(
    "🕷 Sidebar Loaded"
);