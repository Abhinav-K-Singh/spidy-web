/* ====================================
   GITHUB WIDGET
==================================== */

const githubInput =
document.getElementById(
    "githubUsername"
);

const githubData =
document.getElementById(
    "githubData"
);

const githubButton =
document.getElementById(
    "loadGithub"
);

/* ====================================
   LOAD PROFILE
==================================== */

async function loadGithubProfile(){

    const username =
    githubInput.value.trim();

    if(!username){

        showToast(
            "Enter GitHub Username"
        );

        return;

    }

    GithubStorage.saveUsername(
        username
    );

    githubData.innerHTML =

    `
    Loading GitHub Profile...
    `;

    try{

        const response =
        await fetch(

            `https://api.github.com/users/${username}`

        );

        if(!response.ok){

            throw new Error(
                "User Not Found"
            );

        }

        const user =
        await response.json();

        renderGithubProfile(
            user
        );

    }

    catch(error){

        githubData.innerHTML =

        `
        <p>
        GitHub User Not Found
        </p>
        `;

        console.error(error);

    }

}

/* ====================================
   RENDER PROFILE
==================================== */

function renderGithubProfile(user){

    githubData.innerHTML =

    `
    <div class="github-profile">

        <img
        src="${user.avatar_url}"
        class="github-avatar"
        alt="Avatar">

        <h3>
        ${user.name || user.login}
        </h3>

        <p>
        @${user.login}
        </p>

        <div class="github-stats">

            <div>

                📦
                ${user.public_repos}

                Repos

            </div>

            <div>

                👥
                ${user.followers}

                Followers

            </div>

            <div>

                ❤️
                ${user.following}

                Following

            </div>

        </div>

        <a

        href="${user.html_url}"

        target="_blank"

        class="github-link"

        >

        Open Profile

        </a>

    </div>
    `;

}

/* ====================================
   CONTRIBUTION GRAPH
==================================== */

function renderContributionGraph(username){

    return

    `
    <img

    src="https://ghchart.rshah.org/${username}"

    alt="GitHub Graph"

    class="github-graph"

    >
    `;

}

/* ====================================
   LOAD SAVED USER
==================================== */

function loadSavedGithubUser(){

    const username =

    GithubStorage.getUsername();

    if(!username)
    return;

    githubInput.value =
    username;

    loadGithubProfile();

}

/* ====================================
   BUTTON EVENT
==================================== */

githubButton?.addEventListener(

    "click",

    loadGithubProfile

);

/* ====================================
   ENTER KEY
==================================== */

githubInput?.addEventListener(

    "keypress",

    e=>{

        if(
            e.key === "Enter"
        ){

            loadGithubProfile();

        }

    }

);

/* ====================================
   REPOSITORIES
==================================== */

async function loadRepositories(username){

    try{

        const response =
        await fetch(

            `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`

        );

        const repos =
        await response.json();

        let html =

        `
        <div class="github-repos">
        <h4>
        Recent Repositories
        </h4>
        `;

        repos.forEach(repo=>{

            html +=

            `
            <div class="repo-item">

            <a

            href="${repo.html_url}"

            target="_blank"

            >

            ${repo.name}

            </a>

            ⭐ ${repo.stargazers_count}

            </div>
            `;

        });

        html +=
        "</div>";

        githubData.innerHTML +=
        html;

    }

    catch(error){

        console.error(
            error
        );

    }

}

/* ====================================
   ENHANCED PROFILE
==================================== */

async function loadFullGithubProfile(){

    const username =
    githubInput.value.trim();

    if(!username)
    return;

    await loadGithubProfile();

    await loadRepositories(
        username
    );

}

/* ====================================
   STYLES
==================================== */

const githubStyle =

document.createElement(
    "style"
);

githubStyle.innerHTML =

`
.github-profile{

text-align:center;

}

.github-avatar{

width:90px;
height:90px;

border-radius:50%;

margin-bottom:10px;

}

.github-stats{

display:flex;

justify-content:space-around;

margin:15px 0;

}

.github-link{

display:inline-block;

margin-top:10px;

text-decoration:none;

}

.repo-item{

display:flex;

justify-content:space-between;

margin-top:8px;

padding:8px;

border-radius:8px;

background:
rgba(255,255,255,.05);

}

.repo-item a{

text-decoration:none;

color:inherit;

}

.github-graph{

width:100%;

margin-top:15px;

border-radius:12px;

}

`;

document.head.appendChild(
    githubStyle
);

/* ====================================
   INITIALIZE
==================================== */

loadSavedGithubUser();

console.log(
    "📊 GitHub Widget Loaded"
);