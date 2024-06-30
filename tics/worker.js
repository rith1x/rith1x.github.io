function createBoard() {
    const gameBoard = document.createElement('div')
    gameBoard.id = 'gameboard'
    const scrbd = document.createElement('div')
    const shold = document.createElement('div')
    const com = document.createElement('div')
    const cspn = document.createElement('span')
    cspn.innerText = "Pl2"
    cspn.className = "cspn"
    const pspn = document.createElement('span')
    pspn.innerText = "YOU"
    pspn.className = "pspn"
    const cscr = document.createElement('span')
    cscr.id = "cscr"
    const pscr = document.createElement('span')
    pscr.id = "pscr"
    const plr = document.createElement('div')
    com.append(cspn, cscr)
    plr.append(pspn, pscr)
    shold.append(com, plr)
    scrbd.className = "scoreBoard"
    scrbd.append(shold)
    const tag = document.createElement('p')
    tag.className = 'tag'
    tag.innerHTML = `Designed and Developed by <a href="../">Kiruthik Kumar</a>`

    const rmcdediv = document.createElement('div')
    rmcdediv.className = 'rmcdediv'
    rmcdediv.innerHTML = 'GameRoom: <span id="rmcde"></span>'
    document.getElementById('gameBoard').append(rmcdediv, scrbd, gameBoard, tag)
    const board = document.getElementById('gameboard');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const tile = document.createElement('div')
            tile.className = "tile";
            tile.onclick = () => tileClick(`${i}`, `${j}`)
            tile.id = `t${i}${j}`
            board.append(tile)
        }
    }
}

function playerNameGen() {
    function toSentenceCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    let pre = [
        'epic', 'ninja', 'fuzzy', 'dizzy', 'crazy', 'wild', 'zany',
        'spooky', 'silly', 'funky', 'wacky', 'goofy', 'hyper',
        'glitter', 'sparkly', 'sneaky', 'bouncy', 'quirky'
    ];

    let suf = [
        'panda', 'unicorn', 'wizard', 'ninja', 'bunny', 'hamster',
        'duck', 'pirate', 'robot', 'kitten', 'puppy', 'monkey',
        'alien', 'ghost', 'dragon', 'zombie', 'cyclops', 'phoenix'
    ];

    let nux = toSentenceCase(pre[Math.floor(Math.random() * pre.length)])
    nux += ' '
    nux += toSentenceCase(suf[Math.floor(Math.random() * suf.length)])
    return nux
}

function codeGenerator() {
    let vals = "ABCEFGHJKLMNOPQRSTUVWXYZ2346789"
    let code = "";
    while (code.length != 6) {
        code += vals[Math.floor(Math.random() * vals.length)];
    }
    return code;
}

const firebaseConfig = {
    apiKey: "AIzaSyBr6VDBd2wYuAyZwxRN-hyDORchDUAgHDs",
    authDomain: "gamesx-o.firebaseapp.com",
    databaseURL: "https://gamesx-o-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gamesx-o",
    storageBucket: "gamesx-o.appspot.com",
    messagingSenderId: "772171930360",
    appId: "1:772171930360:web:89ea6f271f449df7c3790d"
};
let c = firebase.initializeApp(firebaseConfig);

var currentRoom
var activeUpdate = false
var currentPlayer
var p1name
var p2name
var gmaeState = 'paused'
let gameState = [['e', 'e', 'e'], ['e', 'e', 'e'], ['e', 'e', 'e']];

const pr = (msg) => { console.log(msg) }
createBoard();
createRoom()

function createRoom() {
    pr("Creating")
    currentRoom = codeGenerator()
    pr(currentRoom)
    p1name = playerNameGen()
    pr(p1name)
    document.getElementById('rmcde').innerText = currentRoom


    firebase.database().ref("ROOMS").child("tics").child(currentRoom).set({
        "roomcode": currentRoom,
        "p1name": p1name
    })
    currentPlayer = "p1"

    syncer()

}
function joinRoom() {

    let rcode = document.getElementById('rmcinput').value
    if (rcode.length != 6) {
        pr("Invalid")
        return;
    }
    pr(rcode)
    currentRoom = rcode
    p2name = playerNameGen()
    firebase.database().ref("ROOMS").child("tics").child(currentRoom).child('p2name').set(p2name)

    currentPlayer = "p1"
}



firebase.database().ref("ROOMS").child("tics").child(currentRoom).once("value", function (snapshot) {
    console.log(snapshot)
});








function syncer() {

    firebase.database().ref("ROOMS").child("tics").child(currentRoom).child('gamestate').set(gameState)


}






function swapPlayer(){
    if(currentPlayer == "p1"){
        currentPlayer = "p2"
    } else{
        currentPlayer = "p1"
    }
}


let filled = 0;

function tileClick(x, y) {
    if (gameState[x][y] == 'e') {
        gameState[x][y] = 'X'
        document.getElementById(`t${x}${y}`).style.animation = 'none';
        document.getElementById(`t${x}${y}`).style.animation = 'press 0.5s cubic-bezier(0.175, 0.885, 0.32, 1) 1';
        document.getElementById(`t${x}${y}`).style.color = '#2836ff'
        document.getElementById(`t${x}${y}`).innerHTML = '<i class="fa-solid fa-xmark"></i>'
        filled += 1
        syncer()

        checkBoard()
        swapPlayer()
    }
}
async function computerPlay() {
    await delay(800);
    function randPos() {
        const x = Math.floor(Math.random() * 3)
        const y = Math.floor(Math.random() * 3)
        return [x, y]
    }
    let x, y
    do {
        [x, y] = randPos()
    } while (gameState[x][y] != 'e' && filled < 8);
    filled += 1;
    gameState[x][y] = 'O'
    document.getElementById(`t${x}${y}`).style.animation = 'none';
    document.getElementById(`t${x}${y}`).style.animation = 'press 0.5s cubic-bezier(0.175, 0.885, 0.32, 1) 1';
    document.getElementById(`t${x}${y}`).style.color = '#ff2828'
    document.getElementById(`t${x}${y}`).innerHTML = '<i class="fa-solid fa-o"></i>'
    checkBoard(1)
}
async function drawBorder(x, y, z) {
    document.getElementById(x).style.border = 'solid 3px #fff'
    document.getElementById(x).style.background = '#ffffff30'
    await delay(100)
    document.getElementById(y).style.border = 'solid 3px #fff'
    document.getElementById(y).style.background = '#ffffff30'
    await delay(100)
    document.getElementById(z).style.border = 'solid 3px #fff'
    document.getElementById(z).style.background = '#ffffff30'
}
async function checkBoard(n) {
    if (filled >= 5) {
        if (gameState[0][0] == 'O' && gameState[1][1] == 'O' && gameState[2][2] == 'O') {
            await drawBorder('t00', 't11', 't22')
            gameOver()
        }
        else if (gameState[0][2] == 'O' && gameState[1][1] == 'O' && gameState[2][0] == 'O') {
            await drawBorder('t02', 't11', 't20')
            gameOver()
        }
        else if (gameState[0][0] == 'O' && gameState[0][1] == 'O' && gameState[0][2] == 'O') {
            await drawBorder('t00', 't01', 't02')
            gameOver()
        }
        else if (gameState[1][0] == 'O' && gameState[1][1] == 'O' && gameState[1][2] == 'O') {
            await drawBorder('t10', 't11', 't12')
            gameOver()
        }
        else if (gameState[2][0] == 'O' && gameState[2][1] == 'O' && gameState[2][2] == 'O') {
            await drawBorder('t20', 't21', 't22')
            gameOver()
        }
        else if (gameState[0][0] == 'O' && gameState[1][0] == 'O' && gameState[2][0] == 'O') {
            await drawBorder('t00', 't10', 't20')
            gameOver()
        }
        else if (gameState[0][1] == 'O' && gameState[1][1] == 'O' && gameState[2][1] == 'O') {
            await drawBorder('t01', 't11', 't21')
            gameOver()
        }
        else if (gameState[0][2] == 'O' && gameState[1][2] == 'O' && gameState[2][2] == 'O') {
            await drawBorder('t02', 't12', 't22')
            gameOver()
        }
        else if (gameState[0][0] == 'X' && gameState[1][1] == 'X' && gameState[2][2] == 'X') {
            await drawBorder('t00', 't11', 't22')
            gameOver(1)
        }
        else if (gameState[0][2] == 'X' && gameState[1][1] == 'X' && gameState[2][0] == 'X') {
            await drawBorder('t02', 't11', 't20')
            gameOver(1)
        }
        else if (gameState[0][0] == 'X' && gameState[0][1] == 'X' && gameState[0][2] == 'X') {
            await drawBorder('t00', 't01', 't02')
            gameOver(1)
        }
        else if (gameState[1][0] == 'X' && gameState[1][1] == 'X' && gameState[1][2] == 'X') {
            await drawBorder('t10', 't11', 't12')
            gameOver(1)
        }
        else if (gameState[2][0] == 'X' && gameState[2][1] == 'X' && gameState[2][2] == 'X') {
            await drawBorder('t20', 't21', 't22')
            gameOver(1)
        }
        else if (gameState[0][0] == 'X' && gameState[1][0] == 'X' && gameState[2][0] == 'X') {
            await drawBorder('t00', 't10', 't20')
            gameOver(1)
        }
        else if (gameState[0][1] == 'X' && gameState[1][1] == 'X' && gameState[2][1] == 'X') {
            await drawBorder('t01', 't11', 't21')
            gameOver(1)
        }
        else if (gameState[0][2] == 'X' && gameState[1][2] == 'X' && gameState[2][2] == 'X') {
            await drawBorder('t02', 't12', 't22')
            gameOver(1)
        }
        else {
            if (filled > 8) {
                gameOver(0)
            }
        }
    }
}
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function gameOver(x) {
    await delay(1000)
    let visited = 0;
    let texon;
    if (x == 0) {
        texon = ['T', 'I', 'E', 'T', 'I', 'E', 'T', 'I', 'E']
    } else if (x == 1) {
        texon = ['Y', 'O', 'U', '🏆', '🏆', '🏆', 'W', 'O', 'N']
        pWins += 1
        scoreUpdate()
    } else {
        texon = ['C', 'O', 'M', '🤖', '🤖', '🤖', 'W', 'O', 'N']
        cWins += 1
        scoreUpdate()
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`t${i}${j}`).style.border = "none"
            document.getElementById(`t${i}${j}`).style.background = "#1f1f1f"
            document.getElementById(`t${i}${j}`).style.color = "#fff"
            document.getElementById(`t${i}${j}`).innerText = texon[visited]
            visited++
            await delay(100)
        }
    }
    await delay(1000);
    newGame()
}
async function newGame(n) {
    let visited = 0;
    let texon = ['T', 'I', 'C', 'T', 'A', 'C', 'T', 'O', 'E']
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`t${i}${j}`).style.color = "lime"
            document.getElementById(`t${i}${j}`).innerText = texon[visited]
            document.getElementById(`t${i}${j}`).style.animation = 'press 0.5s cubic-bezier(0.175, 0.885, 0.32, 1) 1';
            visited++
            await delay(100)
        }
    }
    if (n == 1) {
        await delay(1000);
        visited = 0;
        texon = ['', 'B', 'Y', 'R', 'i', 't', 'h', '1', 'x']
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                document.getElementById(`t${i}${j}`).style.color = "#db6dff"
                document.getElementById(`t${i}${j}`).innerText = texon[visited]
                visited++
                await delay(100)
            }
        }
    }
    await delay(800);
    visited = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`t${i}${j}`).style.color = "#fff"
            document.getElementById(`t${i}${j}`).innerText = ''
            document.getElementById(`t${i}${j}`).style.animation = 'none';
            document.getElementById(`t${i}${j}`).style.animation = 'press 0.5s cubic-bezier(0.175, 0.885, 0.32, 1) 1';
            gameState[i][j] = 'e'
            visited++
        }
        await delay(100)
    }
    await delay(800)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`t${i}${j}`).style.animation = 'none';
        }
    }
    filled = 0
}
function scoreUpdate() {
    let localScr = localStorage.getItem('ttthscr');
    if (localScr == null || pWins >= parseInt(localStorage.getItem('ttthscr'))) {
        localStorage.setItem('ttthscr', pWins)
    }
    let hscr = localStorage.getItem('ttthscr');
    document.getElementById('pscr').innerText = pWins
    document.getElementById('cscr').innerText = cWins
}

