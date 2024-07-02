let gamestate = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
let currPlayer;
let p1name;
let p2name;
let moves = 0
let playerCount = 0













async function createBoard() {
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
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div')
        tile.className = "tile";
        tile.onclick = () => tileClick(`${i}`)
        tile.id = `t${i}`
        board.append(tile)
        await delay(45)
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
    ]
    let suf = [
        'panda', 'unicorn', 'wizard', 'ninja', 'bunny', 'hamster',
        'duck', 'pirate', 'robot', 'kitten', 'puppy', 'monkey',
        'alien', 'ghost', 'dragon', 'zombie', 'cyclops', 'phoenix'
    ]
    let nux = `${toSentenceCase(pre[Math.floor(Math.random() * pre.length)])} ${toSentenceCase(suf[Math.floor(Math.random() * suf.length)])}`
    return nux
}


async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


createBoard()