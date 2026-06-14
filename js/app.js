/* ====================================
   APP BOOTSTRAP
==================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeApp();

    }

);

/* ====================================
   INITIALIZE
==================================== */

function initializeApp(){

    initializeClock();

    initializeSearch();

    initializeNotes();

    initializeQuickTodo();

    initializeGreeting();

    console.log(
        "🕷 Spidy Browser Ready"
    );

}

/* ====================================
   CLOCK
==================================== */

function initializeClock(){

    updateClock();

    setInterval(

        updateClock,

        1000

    );

}

function updateClock(){

    const now =
    new Date();

    const clock =
    document.getElementById(
        "clock"
    );

    const dateLine =
    document.getElementById(
        "dateLine"
    );

    if(clock){

        clock.innerText =

        now.toLocaleTimeString(
            [],
            {
                hour:'2-digit',
                minute:'2-digit'
            }
        );

    }

    if(dateLine){

        dateLine.innerText =

        `${getGreeting()} • ${getCurrentDate()}`;

    }

}

/* ====================================
   SEARCH
==================================== */

function initializeSearch(){

    let selectedEngine = "google";

    document
    .querySelectorAll(".engine-btn")
    .forEach(btn=>{

        btn.addEventListener(
            "click",
            ()=>{

                document
                .querySelectorAll(".engine-btn")
                .forEach(b=>
                    b.classList.remove(
                        "active"
                    )
                );

                btn.classList.add(
                    "active"
                );

                selectedEngine =
                btn.dataset.engine;

            }
        );

    });

    const input =
    document.getElementById(
        "searchInput"
    );

    input?.addEventListener(
        "keydown",
        e=>{

            if(e.key !== "Enter")
            return;

            const query =
            input.value.trim();

            if(!query)
            return;

            let url = "";

            switch(selectedEngine){

                case "youtube":

                    url =
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

                    break;

                case "github":

                    url =
                    `https://github.com/search?q=${encodeURIComponent(query)}`;

                    break;

                default:

                    url =
                    `https://www.google.com/search?q=${encodeURIComponent(query)}`;

            }

            window.location.href =
            url;

        }

    );

}

/* ====================================
   QUICK NOTES
==================================== */

function initializeNotes(){

    const noteBox =

    document.getElementById(
        "quickNotes"
    );

    if(!noteBox)
    return;

    noteBox.value =

    NotesStorage.load();

    noteBox.addEventListener(

        "input",

        debounce(

            ()=>{

                NotesStorage.save(

                    noteBox.value

                );

            },

            400

        )

    );

}

/* ====================================
   QUICK TODO
==================================== */

let quickTodos =

TodoStorage.load();

function initializeQuickTodo(){

    renderQuickTodo();

    const addBtn =

    document.getElementById(
        "addTodoBtn"
    );

    addBtn?.addEventListener(

        "click",

        addQuickTodo

    );

}

function addQuickTodo(){

    const text =

    prompt(
        "Task"
    );

    if(!text)
    return;

    quickTodos.push({

        id:generateId(),

        text:text,

        done:false

    });

    saveQuickTodo();

    renderQuickTodo();

}

function toggleQuickTodo(id){

    const task =

    quickTodos.find(

        t=>t.id===id

    );

    if(!task)
    return;

    task.done =

    !task.done;

    saveQuickTodo();

    renderQuickTodo();

}

function deleteQuickTodo(id){

    quickTodos =

    quickTodos.filter(

        t=>t.id!==id

    );

    saveQuickTodo();

    renderQuickTodo();

}

function saveQuickTodo(){

    TodoStorage.save(
        quickTodos
    );

}

function renderQuickTodo(){

    const container =

    document.getElementById(
        "quickTodo"
    );

    if(!container)
    return;

    if(
        quickTodos.length===0
    ){

        container.innerHTML =

        `
        <p>
        No Tasks Yet
        </p>
        `;

        return;

    }

    container.innerHTML = "";

    quickTodos.forEach(task=>{

        const div =

        document.createElement(
            "div"
        );

        div.className =

        `
        todo-item

        ${task.done
            ? "completed"
            : ""
        }
        `;

        div.innerHTML =

        `
        <input

        type="checkbox"

        ${task.done
            ? "checked"
            : ""
        }

        >

        <span>

        ${task.text}

        </span>

        <button>

        ❌

        </button>
        `;

        div.querySelector(
            "input"
        )
        .addEventListener(

            "change",

            ()=>{

                toggleQuickTodo(
                    task.id
                );

            }

        );

        div.querySelector(
            "button"
        )
        .addEventListener(

            "click",

            ()=>{

                deleteQuickTodo(
                    task.id
                );

            }

        );

        container.appendChild(
            div
        );

    });

}

/* ====================================
   GREETING
==================================== */

function initializeGreeting(){

    const subtitle =

    document.querySelector(
        ".top-header p"
    );

    if(!subtitle)
    return;

    subtitle.innerText =

    `${getGreeting()} • ${getRandomQuote()}`;

}

/* ====================================
   THEME SHORTCUT
==================================== */

document.addEventListener(

    "keydown",

    e=>{

        if(

            e.ctrlKey &&

            e.shiftKey &&

            e.key.toLowerCase()==="t"

        ){

            e.preventDefault();

            cycleTheme();

        }

    }

);

function cycleTheme(){

    const themes =

    [
        "dark",
        "light",
        "comic",
        "neon"
    ];

    const current =

    document.body.dataset.theme
    || "dark";

    let index =

    themes.indexOf(
        current
    );

    index++;

    if(
        index >= themes.length
    ){

        index = 0;

    }

    setTheme(
        themes[index]
    );

}

/* ====================================
   FIRST RUN
==================================== */

function firstRunSetup(){

    const launched =

    Storage.load(
        "spidy_first_run"
    );

    if(launched)
    return;

    Storage.save(

        "spidy_first_run",

        true

    );

    showToast(

        "Welcome to Spidy Browser 🕷"

    );

}

firstRunSetup();

/* ====================================
   APP HEALTH CHECK
==================================== */

function runHealthCheck(){

    console.log(
        "Storage:",
        !!window.localStorage
    );

    console.log(
        "Theme:",
        document.body.dataset.theme
    );

}

runHealthCheck();

/* ====================================
   VERSION
==================================== */

const SPIDY_VERSION =

"1.0.0 Ultimate";

console.log(

    `🕷 Spidy Browser ${SPIDY_VERSION}`

);