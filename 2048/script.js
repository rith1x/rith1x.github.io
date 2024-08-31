import Grid from './Grid.js';
import Tile from './Tile.js';
const game = document.getElementById('game')
const grid = new Grid(game)
console.log(grid.randomEmptyCell())
grid.randomEmptyCell().tile = new Tile(game)
grid.randomEmptyCell().tile = new Tile(game)
console.log(grid.cellsByColumn)
setupInput()
setupSwipe()
function randomTheme() {
    // setTheme(Math.floor(Math.random() * 360), 90)
    setTheme(45, 50)
}
function setupInput() {
    // randomTheme()

    window.addEventListener("keydown", handleInput, { once: true })
}
async function handleInput(e) {
    switch (e.key) {
        case "ArrowUp":
            if (!canMoveUp()) {
                setupInput()
                return;
            }
            await moveUp()
            break
        case "ArrowDown":
            if (!canMoveDown()) {
                setupInput()
                return;
            }
            await moveDown()
            break
        case "ArrowLeft":
            if (!canMoveLeft()) {
                setupInput()
                return;
            }
            await moveLeft()
            break
        case "ArrowRight":
            if (!canMoveRight()) {
                setupInput()
                return;
            }
            await moveRight()
            break
        default:
            setupInput()
            return;
    }
    grid.cells.forEach(cell => cell.mergeTiles())

    const newTile = new Tile(game)

    grid.randomEmptyCell().tile = newTile

    if (!canMoveDown() && !canMoveLeft() && !canMoveRight() && !canMoveUp()) {
        newTile.waitForTransition(true).then(() => {
            alert("Game Over!")
        })
        return
    }
    setupInput()


}
// [00 01 02 03] 
// [10 11 12 13] 
// [20 21 22 23]
// [30 31 32 33]
function slideTiles(cells) {
    return Promise.all(
        cells.flatMap(group => {
            const promises = [];
            for (let i = 1; i < group.length; i++) {
                const cell = group[i]
                if (cell.tile == null) continue
                let lastValidCell
                for (let j = i - 1; j >= 0; j--) {
                    const moveToCell = group[j]
                    if (!moveToCell.canAccept(cell.tile)) break
                    lastValidCell = moveToCell
                }
                if (lastValidCell != null) {
                    promises.push(cell.tile.waitForTransition())
                    if (lastValidCell.tile != null) {
                        lastValidCell.mergeTile = cell.tile
                    } else {
                        lastValidCell.tile = cell.tile
                    }
                    cell.tile = null
                }
            }
            return promises
        })
    )
}
function moveUp() {
    slideTiles(grid.cellsByColumn)
}
function moveDown() {
    slideTiles(grid.cellsByColumn.map(column => [...column].reverse())) //reverse the 2d array
}
function moveLeft() {
    slideTiles(grid.cellsByRow)
}
function moveRight() {
    slideTiles(grid.cellsByRow.map(row => [...row].reverse())) //reverse the 2d array
}
function canMoveUp() {
    return canMove(grid.cellsByColumn)
}
function canMoveDown() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
}
function canMoveLeft() {
    return canMove(grid.cellsByRow)
}
function canMoveRight() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()))
}

function canMove(cells) {
    return cells.some(group => {
        return group.some((cell, index) => {
            if (index === 0) return false
            if (cell.tile == null) return false
            const moveToCell = group[index - 1]
            return moveToCell.canAccept(cell.tile)
        })
    })
}
function setupSwipe() {
    let startX, startY;

    game.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    }, { once: true });

    game.addEventListener('touchend', (event) => {
        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;

        const diffX = startX - endX;
        const diffY = startY - endY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                handleSwipe("lf")
            } else {
                handleSwipe("rg")
            }
        } else {
            if (diffY > 0) {
                handleSwipe("up")
            } else {
                handleSwipe("dn")
            }
        }
    }, { once: true });
}
async function handleSwipe(dir) {
    switch (dir) {
        case "up":
            if (!canMoveUp()) {
                setupSwipe()
                return;
            }
            await moveUp()
            break
        case "dn":
            if (!canMoveDown()) {
                setupSwipe()
                return;
            }
            await moveDown()
            break
        case "lf":
            if (!canMoveLeft()) {
                setupSwipe()
                return;
            }
            await moveLeft()
            break
        case "rg":
            if (!canMoveRight()) {
                setupSwipe()
                return;
            }
            await moveRight()
            break
        default:
            setupSwipe()
            return;
    }
    grid.cells.forEach(cell => cell.mergeTiles())

    const newTile = new Tile(game)

    grid.randomEmptyCell().tile = newTile

    if (!canMoveDown() && !canMoveLeft() && !canMoveRight() && !canMoveUp()) {
        newTile.waitForTransition(true).then(() => {
            alert("Game Over!")
        })
        return
    }
    setupSwipe()


}

function setTheme(hue, saturation) {
    document.body.style.setProperty("--bg-intense", `${saturation}%`)
    document.body.style.setProperty("--bg-hue", hue)


}