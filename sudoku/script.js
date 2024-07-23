const game = document.getElementById("board");

createBoard(game);



function createBoard(board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const group = document.createElement('div');
            group.className = 'group';
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    const cell = document.createElement('div')
                    cell.className = "cell"
                    group.append(cell)
                }
            }


            board.appendChild(group)
        }
    }
}