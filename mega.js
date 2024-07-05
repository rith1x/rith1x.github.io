let nv = 0;
function showNav() {
    if (nv == 0) {
        nv = 1
        document.getElementById('menu').style.transform = "translateX(0)"
        document.getElementById('mbtn').innerHTML = '<i class="fa-solid fa-arrow-right"></i>'
    } else {
        nv = 0
        document.getElementById('menu').style.transform = "translateX(100%)"
        document.getElementById('mbtn').innerHTML = '<i class="fa-solid fa-bars"></i>'
    }
}
function porter(dest) {
    window.location.href = `https://rith1x.github.io/${dest}`
}





function worksBox() {

    const workbox = document.getElementById("workBox")

    const works = [
        {
            "title": "Thulir Ecommerce",
            "role": "Individual",
            "description": "Simple Serverless end-to-end Ecommerce Website",
            "stack": ["HTML", "CSS", "Js+JSON"],
            "link": ""
        },
        {
            "title": "Chatie",
            "role": "Individual",
            "description": "Simple Firebase based chatroom with end-to-end message encryption, chatroom vanishing and many more features",
            "stack": ["HTML", "CSS", "Javascript", "Firebase"],
            "link": ""
        },
        {
            "title": "Nutrivision - Frontend",
            "role": "Team",
            "description": "Integration of Front-end with Python Computer vision backend",
            "stack": ["Django", "Python", "HTML", "CSS", "Js"],
            "link": ""
        },
        {
            "title": "Student Notifier System",
            "role": "Team",
            "description": "Utilized PHP and JSON for realtime information sharing between faculties and students",
            "stack": ["PHP", "HTML", "CSS", "Js"],
            "link": ""
        }
    ]
    // <div class="project">
    //     <div class="prj-top">
    //         <h2>Thulir</h2>
    //         <div class="role">Individual</div>

    //     </div>
    //     <p>Simple Serverless end-to-end Ecommerce Website </p>
    //     <div class="stl">
    //         <div class="stack">
    //             <span>HTML</span><span>CSS</span><span>Js+JSON</span>
    //         </div>
    //         <a href="">Learn more</a>
    //     </div>
    // </div>
    works.forEach((wrk, index) => {
        const prDiv = document.createElement('div');
        prDiv.className = "project"

        const prTop = document.createElement('div');
        prTop.className = "prj-top"
        const prth2 = document.createElement('h2');
        prth2.innerText = wrk.title;
        const prole = document.createElement('div');
        prole.className = "role"
        prole.innerText = wrk.role;
        prTop.append(prth2, prole)


        const prdes = document.createElement('p');
        prdes.innerText = wrk.description

        const prstl = document.createElement('div');
        prstl.className = "stl"
        const prstk = document.createElement('div');
        prstk.className = "stack"
        wrk.stack.forEach((el) => {
            const stkspn = document.createElement('span')
            stkspn.innerText = el;
            prstk.append(stkspn)
        })
        const plink = document.createElement('a');
        plink.innerText = "Learn more";
        plink.href = wrk.link;
        prstl.append(prstk, plink)
        prDiv.append(prTop, prdes, prstl);
        workbox.append(prDiv)
    })

}
worksBox()

function gamesBox() {
    const gamesDiv = document.getElementById("proGames");

    const games = [
        {
            "title": "Whackamole",
            "icon": "whack-a-mole.png",
            "onclick": "porter('whackamole')"
        },
        {
            "title": "HandCricket",
            "icon": "cricket-player (1).png",
            "onclick": "porter('cricket')"
        },
        {
            "title": "Stone paper scissor v2",
            "icon": "rock-paper-scissors.png",
            "onclick": "porter('rps')"
        },
        {
            "title": "Math Random",
            "icon": "choose.png",
            "onclick": "porter('random')"
        },
        {
            "title": "Tic Tac Toe",
            "icon": "tic-tac-toe.png",
            "onclick": "porter('tictactoe')"
        },
        {
            "title": "Trivia",
            "icon": "speech-bubble.png",
            "onclick": "porter('trivia')"
        },
        {
            "title": "Stone Paper Scissors",
            "icon": "rock-paper-scissors (1).png",
            "onclick": "porter('stonepaperscissors')"
        },
        {
            "title": "Flappy - (Preview)",
            "icon": "game.png",
            "onclick": "porter('flappy')"
        }
    ]

    games.forEach((game) => {
        const gBox = document.createElement('div');
        gBox.className = "app"
        gBox.onclick = () => { game.onclick }
        const gIco = document.createElement('div')
        gIco.className = "app-icon"
        const gImg = document.createElement('img')
        gImg.src = game.icon;
        gIco.append(gImg)
        const gH4e = document.createElement('h4')
        gH4e.className = "app-title"
        gH4e.innerText = game.title
        gBox.append(gIco, gH4e)
        gamesDiv.appendChild(gBox)
    })

}
gamesBox()
