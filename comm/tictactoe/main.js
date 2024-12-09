function createBoard() {
    const board = document.getElementById('game');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const tile = document.createElement('div');
            tile.className = "tile";
            tile.style.height = `${parseInt(board.offsetHeight / 3) - 2}px`;
            tile.style.width = `${parseInt(board.offsetWidth / 3) - 2}px`;
            tile.id = `t${i}${j}`;
            tile.setAttribute('x', i);
            tile.setAttribute('y', j);
            tile.setAttribute('pow', '');
            board.append(tile);
        }
    }
}

let gameState = [
    ['e', 'e', 'e'],
    ['e', 'e', 'e'],
    ['e', 'e', 'e']
];
let filled = 0, cWins = 0, pWins = 0;

function tileClick(x, y) {
    disableTouch();
    if (gameState[x][y] === 'e') {
        gameState[x][y] = 'X';
        const tile = document.getElementById(`t${x}${y}`);
        tile.style.animation = 'none';
        tile.style.animation = 'press 0.5s cubic-bezier(0.175, 0.885, 0.32, 1) 1';
        tile.style.color = '#ffffff';
        tile.innerText = 'X';
        filled++;
        checkBoard();
    }
}

async function computerPlay() {
    await delay(800);
    let x, y;

    do {
        x = Math.floor(Math.random() * 3);
        y = Math.floor(Math.random() * 3);
    } while (gameState[x][y] !== 'e' && filled < 8);

    gameState[x][y] = 'O';
    filled++;
    const tile = document.getElementById(`t${x}${y}`);
    tile.style.animation = 'none';
    tile.style.animation = 'press 0.5s cubic-bezier(0.175, 0.885, 0.32, 1) 1';
    tile.style.color = '#ffffff50';
    tile.innerText = 'O';

    checkBoard(1);
    enableTouch();
}

async function drawBorder(x, y, z) {
    const tiles = [x, y, z].map(id => document.getElementById(id));
    for (const tile of tiles) {
        tile.style.color = '#f00';
        await delay(100);
    }
}

async function checkBoard(n) {
    if (filled >= 5) {
        const winningConditions = [
            ['t00', 't01', 't02'],
            ['t10', 't11', 't12'],
            ['t20', 't21', 't22'],
            ['t00', 't10', 't20'],
            ['t01', 't11', 't21'],
            ['t02', 't12', 't22'],
            ['t00', 't11', 't22'],
            ['t02', 't11', 't20']
        ];

        for (const [a, b, c] of winningConditions) {
            const [ax, ay] = a.slice(1).split('');
            const [bx, by] = b.slice(1).split('');
            const [cx, cy] = c.slice(1).split('');

            if (gameState[ax][ay] !== 'e' &&
                gameState[ax][ay] === gameState[bx][by] &&
                gameState[bx][by] === gameState[cx][cy]) {
                await drawBorder(a, b, c);
                return gameOver(gameState[ax][ay] === 'X' ? 1 : 2);
            }
        }

        if (filled > 8) {
            return gameOver(0);
        } else if (n !== 1) {
            computerPlay();
        }
    } else if (n !== 1) {
        computerPlay();
    }
}

async function gameOver(winner) {
    await delay(1000);
    if(winner == 1){
        pWins++
        scoreUpdate()
    }
    const text = winner === 1 ? 'YOU   WON' : winner === 2 ? 'COM   WON' : 'TIE   TIE';
    filled = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameState[i][j] = 'e';
            const tile = document.getElementById(`t${i}${j}`);
            tile.style.color = '#fff';
            tile.innerText = text[i * 3 + j] || '';
        }
    }

    await delay(1000);
    newGame();
}

function newGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const tile = document.getElementById(`t${i}${j}`);
            tile.style.color = '#fff';
            tile.innerText = '';
            gameState[i][j] = 'e';
        }
    }
    filled = 0;
    enableTouch();
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function enableTouch() {
    const tiles = document.getElementsByClassName('tile');
    Array.from(tiles).forEach(tile => {
        tile.onclick = () => {
            const x = parseInt(tile.getAttribute('x'));
            const y = parseInt(tile.getAttribute('y'));
            tileClick(x, y);
        };
    });
}

function disableTouch() {
    const tiles = document.getElementsByClassName('tile');
    Array.from(tiles).forEach(tile => (tile.onclick = null));
}


function scoreUpdate() {
    let localScr = localStorage.getItem('ttthsc');
    if (localScr === null || pWins > parseInt(localScr)) {
        localStorage.setItem('ttthsc', pWins);
    }
    let hscr = localStorage.getItem('ttthsc');
    document.getElementById('hScore').innerText = hscr;
}

function showGame() {
    document.getElementById('ttt').scroll({ top: 100, behavior: "smooth" })
}
createBoard();
newGame();
enableTouch();
scoreUpdate();
