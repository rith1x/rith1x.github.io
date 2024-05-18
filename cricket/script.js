const tossModal = document.getElementById('toss')
const toss_body = document.getElementById('toss_content')
const gameInfo = document.getElementById("gameInfo");

function shows() {
    tossModal.showModal();
}
function closeToss() {
    tossModal.close();

}
function randomGenerator(n) {
    if (n == 2) {
        let x = Math.floor(Math.random() * 10);
        return x > 5 ? 'even' : 'odd';
    } else if (n == 6) {
        return Math.floor(Math.random() * 6) + 1;
    }
}

let playerScore = 0;
let botScore = 0;
let currentBatter = "Player";
let currentBowler = "Computer";
let round = 0;
let bats = 0;
shows();
function giveUserChoice() {
    toss_body.innerHTML = `<div class="cont" > Electing to: </div ><button onclick="chooseTo('bowl')">Bowling</button><button onclick="chooseTo('bat')">Batting</button>`;
}
function computerChoice() {
    let comp_choice = randomGenerator(6);
    if (comp_choice > 3) {
        currentBatter = "Computer"
        currentBowler = "Player"
        toss_body.innerHTML = "Computer Choosed to Bat!"
        setTimeout(() => {
            tossModal.close()
            startGame()

        }, 2000)

    } else {
        currentBatter = "Player"
        currentBowler = "Computer"
        toss_body.innerHTML = "Computer Choosed to Bowl!"
        setTimeout(() => {
            tossModal.close()
            startGame()

        }, 2000)
    }
}
function chooseTo(role) {
    if (role == 'bat') {
        currentBatter = "Player"
        currentBowler = "Computer"
        toss_body.innerText = "You choosed to Bat"

        setTimeout(() => {
            tossModal.close()
            startGame()

        }, 2000)
    } else {
        currentBowler = 'Player'
        currentBatter = "Computer"
        toss_body.innerText = "You choosed to Bowl"
        setTimeout(() => {
            tossModal.close()
            startGame()
        }, 2000)
    }
}
function userToss(usernum) {
    let userchoice = document.querySelector('input[name="choice"]:checked').value;
    let botchoice = userchoice == 'even' ? 'odd' : 'even';
    console.log(userchoice + " " + botchoice)
    let botnum = randomGenerator(6)
    let totalToss = parseInt(usernum) + parseInt(botnum);
    console.log(usernum + " " + botnum)
    console.log("Total: " + totalToss)
    if (totalToss % 2 == 0) {
        if (userchoice == 'even') {
            console.log("User guessed")
            giveUserChoice();
        } else {
            console.log("Comp turn")
            computerChoice();
        }
    } else {
        if (userchoice == 'odd') {
            console.log("User guessed")
            giveUserChoice();
        } else {
            console.log("Comp turn")
            computerChoice();
        }

    }
}
function uiUpdate() {
    gameInfo.innerText = `
    Current Bowler: ${currentBowler}
    Current Batter: ${currentBatter}
    Score: ${playerScore}
    Bot-Score: ${botScore}    
    `
}
function startGame() {
    document.getElementById('gamespace').style.visibility = "visible"
    gameInfo.innerText = `
    Current Bowler: ${currentBowler}
    Current Batter: ${currentBatter}
    Score: ${playerScore}
    Bot-Score: ${botScore}    
    `
    if (currentBatter == 'Computer') {
        computerThrow();
    }
}
function userThrow(choice) {
    let botChoice = randomGenerator(6);
    if (botChoice == choice) {
        if (round == 1 && playerScore == botScore) {
            gameoverDraw();
        } else {
            alert('Out');
            stateChange();
        }

    } else {
        if (currentBatter == 'Player') {
            playerScore += parseInt(choice);
            uiUpdate()
            if (playerScore > botScore && round == 1) {
                gameover();
            }
        } else {
            botScore += parseInt(botChoice);
            uiUpdate()
            if (botScore > playerScore && round == 1) {
                gameover();
            }
        }
    }

}
function stateChange() {
    round += 1;
    if (round < 2) {
        currentBatter = currentBatter == 'Player' ? 'Computer' : 'Player';
        currentBowler = currentBowler == 'Player' ? 'Computer' : 'Player';
        uiUpdate();
    } else {
        gameover();
    }
}
function gameover() {
    let winner = playerScore > botScore ? 'Player' : 'Computer'
    let diff = winner == 'Player' ? playerScore - botScore : botScore - playerScore;
    document.body.innerText = `${winner} won by ${diff} Runs`;
}
function gameoverDraw() {
    document.body.innerText = `Draw Match`;
}