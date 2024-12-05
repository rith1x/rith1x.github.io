function createBoard() {

    const board = document.getElementById('game');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const tile = document.createElement('div')
            tile.className = "tile";
            tile.style.height = parseInt(board.offsetHeight / 3) - 2 + 'px'
            tile.style.width = parseInt(board.offsetWidth / 3) - 2 + "px"
            tile.onclick = () => tileClick(`${i}`, `${j}`)
            tile.id = `t${i}${j}`
            board.append(tile)
        }
    }
}
let gameState = [['e', 'e', 'e'], ['e', 'e', 'e'], ['e', 'e', 'e']];
let filled = 0;
let cWins = 0;
let pWins = 0;
function tileClick(x, y) {
    if (gameState[x][y] == 'e') {
        gameState[x][y] = 'X'
        document.getElementById(`t${x}${y}`).style.animation = 'none';
        document.getElementById(`t${x}${y}`).style.animation = 'press 0.5s cubic-bezier(0.175, 0.885, 0.32, 1) 1';
        document.getElementById(`t${x}${y}`).style.color = '#ffffff'
        document.getElementById(`t${x}${y}`).innerText = 'X'
        filled += 1
        checkBoard()
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
    document.getElementById(`t${x}${y}`).style.color = '#ffffff50'
    document.getElementById(`t${x}${y}`).innerText = 'O'
    checkBoard(1)
}
async function drawBorder(x, y, z) {
    // document.getElementById(x).style.border = 'solid 3px #fff'
    document.getElementById(x).style.color = '#f00'
    await delay(100)
    // document.getElementById(y).style.border = 'solid 3px #fff'
    document.getElementById(y).style.color = '#f00'
    await delay(100)
    // document.getElementById(z).style.border = 'solid 3px #fff'
    document.getElementById(z).style.color = '#f00'
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
            } else if (n != 1) {
                computerPlay()
            }
        }
    } else {
        if (n != 1) {
            computerPlay()
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
        texon = ['S', 'T', 'R', 'E', 'A', 'K', '', pWins + 1, '']
        pWins += 1
        scoreUpdate()
    } else {
        texon = ['C', 'O', 'M', '🤖', '🤖', '🤖', 'W', 'O', 'N']
        cWins += 1
        scoreUpdate()
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
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
let up = false
function scoreUpdate() {
    let localScr = localStorage.getItem('ttthscr');
    if (localScr == null || pWins >= parseInt(localStorage.getItem('ttthscr'))) {
        localStorage.setItem('ttthscr', pWins)
    }
    let hscr = localStorage.getItem('ttthscr');
    // document.getElementById('pscr').innerText = pWins
    document.getElementById('hScore').innerText = hscr
}
createBoard();
newGame(1)
scoreUpdate()
function showGame() {

    document.getElementById('ttt').scroll({ top: 100, behavior: "smooth" })


}