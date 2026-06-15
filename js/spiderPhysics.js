/* ====================================
   SPIDY WEB PHYSICS FINAL
==================================== */

const spider =
document.querySelector(".spider");

const thread =
document.querySelector(".spider-thread");

if (!spider || !thread) {
    console.error("Spider elements not found");
}

/* ====================================
   SETTINGS
==================================== */

const pivotOffset = 100;

const defaultLength = 250;

const gravity = 0.004;

const damping = 0.992;

/* ====================================
   STATE
==================================== */

let angle = 0;

let velocity = 0;

let acceleration = 0;

let length = defaultLength;

let dragging = false;

/* ====================================
   RENDER
==================================== */

function renderSpider() {

    const pivotX =
    window.innerWidth - pivotOffset;

    const pivotY = 0;

    /* THREAD END */

    const endX =
    pivotX +
    Math.sin(angle) * length;

    const endY =
    pivotY +
    Math.cos(angle) * length;

    /* THREAD */

    thread.style.left =
    pivotX + "px";

    thread.style.top =
    "0px";

    thread.style.height =
    length + "px";

    thread.style.transform =
    `translateX(-50%)
     rotate(${-angle}rad)`;

    /* SPIDER */

spider.style.left =
(endX - spider.offsetWidth / 2) + "px";

spider.style.top =
(endY - spider.offsetHeight / 2) + "px";

    spider.style.transform =
     `rotate(${angle * 12}deg)`;
}

/* ====================================
   ANIMATION
==================================== */

function animateSpider() {

    if (!dragging) {

        acceleration =
        (-gravity) *
        Math.sin(angle);

        velocity +=
        acceleration;

        velocity *=
        damping;

        angle +=
        velocity;

        /* Return rope length */

        length +=
        (defaultLength - length)
        * 0.02;

        /* Snap to center */

        if (
            Math.abs(angle) < 0.001 &&
            Math.abs(velocity) < 0.001
        ) {

            angle = 0;
            velocity = 0;
        }
    }

    renderSpider();

    requestAnimationFrame(
        animateSpider
    );
}

/* ====================================
   MOUSE DRAG
==================================== */

spider.addEventListener(
    "mousedown",
    (e) => {

        e.preventDefault();

        dragging = true;

        velocity = 0;

        spider.classList.add(
            "dragging"
        );
    }
);

document.addEventListener(
    "mousemove",
    (e) => {

        if (!dragging) return;

        const pivotX =
        window.innerWidth - pivotOffset;

        const dx =
        e.clientX - pivotX;

        const dy =
        Math.max(
            100,
            e.clientY
        );

        angle =
        Math.atan2(
            dx,
            dy
        );

        length =
        Math.max(
            220,
            Math.min(
                450,
                Math.sqrt(
                    dx * dx +
                    dy * dy
                )
            )
        );
    }
);

document.addEventListener(
    "mouseup",
    () => {

        dragging = false;

        spider.classList.remove(
            "dragging"
        );
    }
);

/* ====================================
   TOUCH SUPPORT
==================================== */

spider.addEventListener(
    "touchstart",
    () => {

        dragging = true;

        velocity = 0;
    }
);

document.addEventListener(
    "touchmove",
    (e) => {

        if (!dragging) return;

        const touch =
        e.touches[0];

        const pivotX =
        window.innerWidth - pivotOffset;

        const dx =
        touch.clientX - pivotX;

        const dy =
        Math.max(
            100,
            touch.clientY
        );

        angle =
        Math.atan2(
            dx,
            dy
        );

        length =
        Math.max(
            220,
            Math.min(
                450,
                Math.sqrt(
                    dx * dx +
                    dy * dy
                )
            )
        );
    }
);

document.addEventListener(
    "touchend",
    () => {

        dragging = false;
    }
);

/* ====================================
   RESIZE
==================================== */

window.addEventListener(
    "resize",
    renderSpider
);

/* ====================================
   START
==================================== */

renderSpider();

animateSpider();