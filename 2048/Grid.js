const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 1;

export default class Grid {
    #cells
    constructor(gridel) {
        gridel.style.setProperty('--g-size', GRID_SIZE);
        gridel.style.setProperty('--c-size', `${CELL_SIZE}vmin`);
        gridel.style.setProperty('--g-gap', `${CELL_GAP}vmin`);
        gridel.style.padding = `${CELL_GAP}vmin`;

        this.#cells = createCells(gridel).map((cellElement, index) => {
            return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE))
        })
    }
    get cells() {
        return this.#cells
    }
    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell
            return cellGrid
        }, [])
        // returns cell 1d array as 2d array
    }
    get cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x] = cell
            return cellGrid
        }, [])
        // returns cell 1d array as 2d array
    }


    get #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null)
    }
    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
        return this.#emptyCells[randomIndex]
    }

}
class Cell {
    #cellElement
    #x
    #y
    #tile
    #mergeTile
    constructor(cellElement, x, y) {
        this.#cellElement = cellElement
        this.#x = x
        this.#y = y
    }
    get tile() {
        return this.#tile;
    }

    set tile(val) {
        this.#tile = val;
        if (val == null) return
        this.#tile.x = this.#x;
        this.#tile.y = this.#y;

    }
    get x() { return this.#x }
    get y() { return this.#y }
    get mergeTile() { return this.#mergeTile }

    set mergeTile(val) {
        this.#mergeTile = val
        if (val == null) return
        this.#mergeTile.x = this.#x
        this.#mergeTile.y = this.#y
    }

    canAccept(tile) {
        return (this.tile == null || (this.mergeTile == null && this.tile.value === tile.value))
    }

    mergeTiles() {
        if (this.tile == null || this.mergeTile == null) return
        this.tile.value = this.tile.value + this.mergeTile.value
        this.mergeTile.remove()

        this.mergeTile = null

    }
}
function createCells(gridel) {
    const cells = []
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement('div')
        cell.className = "cell"
        cells.push(cell)
        gridel.append(cell)
    }
    return cells
}

