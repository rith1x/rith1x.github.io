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
let balls = 0;
let lasten = '';
shows();
function giveUserChoice() {
    document.getElementById('toss-btn').style.display = 'none';
    toss_body.innerHTML = `
    <div class="cont">Choose to </div>
    <div class="toggle" id="evenodd">
        <input type="radio" id="sizeWeight" oninput="chooseTo('bowl')" />
        <label for="sizeWeight">Bowling</label>
        <input type="radio" id="sizeDimensions" oninput="chooseTo('bat')"/>
        <label for="sizeDimensions">Batting</label>
    </div>
    `;
}
function computerChoice() {
    let comp_choice = randomGenerator(6);
    if (comp_choice > 3) {
        currentBatter = "Computer"
        currentBowler = "Player"
        document.getElementById('toss-btn').style.display = 'none';

        toss_body.innerHTML = "Computer Choosed to Bat!"
        setTimeout(() => {
            tossModal.close()
            startGame()

        }, 2000)

    } else {
        currentBatter = "Player"
        currentBowler = "Computer"
        document.getElementById('toss-btn').style.display = 'none';

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
    // gameInfo.innerText = `
    // Current Bowler: ${currentBowler}
    // Current Batter: ${currentBatter}
    // Score: ${playerScore}
    // Bot-Score: ${botScore}    
    // `

    document.getElementById('sr').innerText = ((playerScore / balls) * 100).toFixed(2)
    if (currentBatter == 'Computer') {
        document.getElementById('c-bat').className = 'show-bat'
    } else {
        document.getElementById('u-bat').className = 'show-bat'

    }
    if (round == 1 && currentBatter == 'Player') {
        document.getElementById('rtw').innerText = botScore - playerScore;
    } else {
        document.getElementById('rtw').innerText = 0;

    }
    document.getElementById("ltb").innerText = lasten.slice(-20);

    document.getElementById("bScr").innerText = botScore
    document.getElementById("pScr").innerText = playerScore
}
function startGame() {
    uiUpdate();
    document.getElementById('gamespace').style.visibility = "visible"

}

function userThrow(choice) {
    let botChoice = randomGenerator(6);
    balls += 1;
    if (botChoice == choice) {
        lasten += 'W '
        uiUpdate();

        if (round == 1 && playerScore == botScore) {
            gameoverDraw();
        } else {
            document.getElementById('u-bat').classList.remove('show-bat')
            document.getElementById('c-bat').classList.remove('show-bat')

            stateChange();
        }

    } else {
        if (currentBatter == 'Player') {
            playerScore += parseInt(choice);
            lasten += choice + " "
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
    document.getElementById('oneliner').innerText = `${winner} won by ${diff} Runs`;
    if (winner == 'Player') {
        document.querySelector('[botpop]').className = "run";
        document.querySelector('[botpop]').innerText = "Runner";
        document.querySelector('[plrpop]').className = "win";
        document.querySelector('[plrpop]').innerText = "Winner";
    } else {
        document.querySelector('[botpop]').className = "win";
        document.querySelector('[botpop]').innerText = "Winner";
        document.querySelector('[plrpop]').className = "run";
        document.querySelector('[plrpop]').innerText = "Runner";
    }
    document.getElementById('scorecard').showModal()

}
function gameoverDraw() {
    document.body.innerText = `Draw Match`;
}


