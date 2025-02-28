
class Sudoku {

    constructor() {
        this.generateNew()
    }

    generateNew() {
        this.grid = []
        for (let i = 0; i < 9; i++) {
            const row = []
            for (let j = 0; j < 9; j++) {
                row.push(0)
            }
            this.grid.push(row)
        }
        this.fillGrid(this.grid, 0, 0)
        this.solutionGrid = this.grid.map(row => [...row])
    }

    toString() {
        return this.grid.map(row => row.join(' ')).join('\n');
    }
    reset() {
        this.generateNew()
    }

    getSolution() {
        return this.solutionGrid
    }

    getEasy() {
        return this.getUnsolved('easy')
    }

    getMedium() {
        return this.getUnsolved('medium')
    }

    getHard() {
        return this.getUnsolved('hard')
    }

    fillGrid(grid, row, col) {
        if (col === 9) {
            col = 0;
            row++
            if (row === 9) {
                return true
            }
        }
        if (this.grid[row][col] !== 0) {
            return this.fillGrid(this.grid, row, col + 1)
        }
        const nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
        for (let i = 0; i < 9; i++) {
            const num = nums[i]
            if (this.isValid(this.grid, row, col, num)) {
                this.grid[row][col] = num
                if (this.fillGrid(this.grid, row, col + 1)) {
                    return true
                }
                this.grid[row][col] = 0
            }
        }
        return false
    }

    isValid(grid, row, col, num) {
        return (
            !this.usedInRow(this.grid, row, num) &&
            !this.usedInCol(this.grid, col, num) &&
            !this.usedInBox(this.grid, row - (row % 3), col - (col % 3), num)
        )
    }

    usedInRow(grid, row, num) {
        for (let col = 0; col < 9; col++) {
            if (this.grid[row][col] === num) return true
        }
        return false
    }

    usedInCol(grid, col, num) {
        for (let row = 0; row < 9; row++) {
            if (this.grid[row][col] === num) return true
        }
        return false
    }

    usedInBox(grid, boxStartRow, boxStartCol, num) {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.grid[row + boxStartRow][col + boxStartCol] === num) return true
            }
        }
        return false;
    }

    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        return arr
    }

    getUnsolved(level) {
        let numZ
        if (level == 'easy') numZ = 25
        if (level == 'medium') numZ = 45
        if (level == 'hard') numZ = 62
        const copy = this.grid.map(el => [...el])
        let ct = 0
        while (ct < numZ) {
            let r = Math.floor(Math.random() * 9)
            let c = Math.floor(Math.random() * 9)
            if (copy[r][c] !== 0) {
                copy[r][c] = 0
                ct++
            }
        }
        return copy
    }
}
let lvl = 1
let arr
let isSelected = false
let elSelected = ''
let veSelected
let hoSelected
let game;
let userBoard;
let started = false
let startTime = 0
let duration = 0

function selected(x, y) {
    if (!started) timerStart()
    unSelectCells()
    if (document.getElementById(`c${x}${y}`).classList.contains('naS')) return
    // for (let i = 0; i < 9; i++) {
    //     document.getElementById(`c${i}${y}`).style.border = 'solid 1px #aaa'
    //     document.getElementById(`c${x}${i}`).style.border = 'solid 1px #aaa'

    // }
    isSelected = true
    elSelected = `c${x}${y}`
    hoSelected = x
    veSelected = y
    document.getElementById(`c${x}${y}`).style.background = '#5965C8'
    manageSelection()
}

function unSelectCells() {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`c${i}${j}`).style.background = '#353A50';
            if ((i < 3 && j < 3) || (i < 3 && j > 5) || (i > 2 && i < 6 && j > 2 && j < 6) || (i > 5 && j < 3) || (i > 5 && j > 5)) document.getElementById(`c${i}${j}`).style.background = '#454966'

        }
    }
}


async function generateBoard() {

    const board = document.getElementById('board')
    board.innerHTML = ''
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div')
            cell.className = "cell"
            if ((i < 3 && j < 3) || (i < 3 && j > 5) || (i > 2 && i < 6 && j > 2 && j < 6) || (i > 5 && j < 3) || (i > 5 && j > 5)) cell.classList.add('eve')
            cell.id = `c${i}${j}`
            cell.onclick = () => { selected(i, j) }
            board.append(cell)
        }
        await delay(60)
    }
    fillCell()
}


generateBoard()

async function fillCell() {
    game = new Sudoku()
    arr = (lvl === 0) ? game.getEasy() : (lvl === 1) ? game.getMedium() : game.getHard()
    userBoard = arr
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (arr[i][j] !== 0) {
                document.getElementById(`c${i}${j}`).innerText = arr[i][j]
                document.getElementById(`c${i}${j}`).classList.add('naS')
            } else {
                continue
            }
        }
        await delay(30)
    }
}

let optionArray = []
function manageSelection() {
    for (let i = 0; i < 9; i++) {
        if (arr[hoSelected][i] !== 0 && !optionArray.includes(arr[hoSelected][i])) {
            optionArray.push(arr[hoSelected][i])
        }
        if (arr[i][veSelected] !== 0 && !optionArray.includes(arr[i][veSelected])) {
            optionArray.push(arr[i][veSelected])

        }
    }
    const optionEl = document.getElementById('options')
    optionEl.innerHTML = ''
    for (let i = 1; i < 10; i++) {
        const optEl = document.createElement('div')
        optEl.className = 'option'
        optEl.innerText = i
        if (!optionArray.includes(i)) {
            optEl.onclick = () => { assignVal(i, elSelected) }
        } else {
            optEl.classList.add('disabled')
        }

        optionEl.append(optEl)

    }
    const cancel = document.createElement('div')
    cancel.classList.add('option', 'cancel')
    cancel.innerText = "✕"
    cancel.onclick = () => { assignVal(0, elSelected) }
    optionEl.append(cancel)



}
function assignVal(val, el) {
    if (val == 0) {
        document.getElementById(el).innerText = ''

    } else {

        document.getElementById(el).innerText = val
    }
    // await delay(300)
    unSelectCells()
    userBoard[parseInt(el[1])][parseInt(el[2])] = val
    checkFilled()
    elSelected = ''
    isSelected = false
    optionArray = []

}
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function checkFilled() {
    let total = 81
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (userBoard[i][j] == 0) total--
        }
    }
    if (Math.floor((total / 81) * 100) == 100 || total === 81) {
        winnerFinalize()
        timerStop()
    }

}

function showWinner() {

    let appm = ''
    let apps = ''
    let apph = ''
    const hh = Math.floor(duration / 3600);
    const mm = Math.floor((duration % 3600) / 60);
    const ss = duration % 60;

    if (mm < 10) appm = 0
    if (ss < 10) apps = 0
    if (hh < 10) apph = 0
    document.getElementById('ttk').innerText = `Time taken: ${apph}${hh}h ${appm}${mm}m ${apps}${ss}s`
    document.getElementById('winner').style.visibility = 'visible'
}
function hideWinner() {
    document.getElementById('winner').style.visibility = 'hidden'
    endGame()
}
function winnerFinalize() {
    duration = startTime
    let flag = true
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (userBoard[i][j] != game.solutionGrid[i][j]) flag = false
        }
    }
    if (flag) showWinner()

}
function endGame() {
    window.location.reload()
}
function showDifficulty() {
    document.getElementById('diffmenu').style.visibility = 'visible'
}
function closeDiffmenu() {
    document.getElementById('diffmenu').style.visibility = 'hidden'

}
function setMode(lvl) {
    lvl = parseInt(lvl)
    document.getElementById('welcome').style.display = 'none'
    document.getElementById('modex').innerText = (lvl == 0) ? 'Easy' : (lvl == 1) ? 'Medium' : 'Hard'
    timerStop()
    generateBoard()
}
let intFn

function timerStart() {
    started = true
    // startTime = new Date()
    intFn = setInterval(refreshTime, 1000)
}
function refreshTime() {
    // let curr = new Date()
    // let diff = Math.floor((curr - startTime) / 1000)
    startTime++
    refreshDisplayTime()
}

function timerStop() {
    started = false
    startTime = 0
    document.getElementById('time').innerText = `00:00:00`

    clearInterval(intFn)
}

function refreshDisplayTime() {
    let appm = ''
    let apps = ''
    let apph = ''
    const hh = Math.floor(startTime / 3600);
    const mm = Math.floor((startTime % 3600) / 60);
    const ss = startTime % 60;
    if (mm < 10) appm = 0
    if (ss < 10) apps = 0
    if (hh < 10) apph = 0
    document.getElementById('time').innerText = `${apph}${hh}:${appm}${mm}:${apps}${ss}`
}
document.addEventListener('keypress', (e) => {

    let ky = parseInt(e.key)
    if (isSelected && !optionArray.includes(ky)) {
        assignVal(ky, elSelected)
    }

})
function showRules() {
    document.getElementById('rules').style.visibility = 'visible'
}
function closeRules() {
    document.getElementById('rules').style.visibility = 'hidden'
}