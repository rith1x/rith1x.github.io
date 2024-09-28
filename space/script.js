const grid = document.getElementById('grid')
const ptsd = document.getElementsByTagName('h1')[0]
const plysht = document.getElementById('shoot')
const plytyp = document.getElementById('type')
const plybom = document.getElementById('blast')
const width = 15;
let contents = "Space Invaders"
typer()
let isGoingRght = true
let dir = 1;
let lim = 0;
let lvl = 1;
let muted = false;
if (!muted) {
    plybom.setAttribute('muted', 'muted')
    plytyp.setAttribute('muted', 'muted')
    plysht.setAttribute('muted', 'muted')
    document.getElementById('bg').setAttribute('muted', true)
}
var pixels
let alienShooter = []
const levels = {

    l1: [5, 6, 7, 8, 9, 10, 20, 21, 22, 23, 24, 25, 35, 36, 37, 38, 39, 40],
    l2: [0, 2, 4, 6, 8, 10, 12, 30, 32, 34, 36, 38, 40, 42, 44, 46],
    l3: [10, 11, 12, 13, 14, 25, 26, 27, 28, 29, 40, 41, 42, 43, 44],
    l4: [3, 4, 5, 9, 10, 11, 13, 14, 30, 31, 32, 34, 35, 49, 50],
    l5: [15, 16, 17, 18, 19, 34, 35, 36, 37, 38, 53, 54, 55, 56, 57],
    l6: [2, 4, 6, 8, 10, 24, 26, 28, 30, 44, 46, 48],
    l7: [0, 1, 2, 15, 16, 17, 18, 19, 30, 31, 32, 33, 34, 45, 46, 47, 48, 49],
    l8: [11, 12, 13, 26, 27, 28, 29, 42, 43, 44],
    l9: [5, 6, 7, 22, 23, 24, 37, 38, 39],
    l10: [1, 2, 3, 4, 5, 6, 21, 22, 23, 24, 25, 26],
    l11: [3, 4, 5, 20, 21, 22, 37, 38, 39],
    l12: [0, 2, 4, 6, 8, 20, 22, 24, 26, 28, 40, 42, 44],
    l13: [7, 8, 9, 22, 23, 24, 37, 38, 39],
    l14: [12, 13, 14, 27, 28, 29, 42, 43, 44],
    l15: [10, 11, 12, 13, 14, 25, 26, 27, 28, 29],
    l16: [5, 6, 7, 20, 21, 22, 35, 36, 37],
    l17: [1, 3, 5, 7, 9, 11, 13, 21, 23, 25, 27, 29, 31, 33, 41, 43, 45],
    l18: [4, 5, 6, 19, 20, 21, 34, 35, 36],
    l19: [3, 4, 5, 18, 19, 20, 33, 34, 35],
    l20: [7, 8, 9, 10, 11, 12, 13, 22, 23, 24, 25, 26, 27],
    l21: [0, 1, 2, 3, 4, 5, 6, 15, 16, 17, 18, 19, 20],
    l22: [30, 31, 32, 33, 34, 35, 36, 45, 46, 47, 48, 49, 50],
    l23: [9, 10, 11, 12, 13, 14, 24, 25, 26, 27, 28, 29],
    l24: [7, 9, 11, 23, 25, 27, 39, 41, 43],
    l25: [0, 2, 4, 6, 8, 20, 22, 24, 26, 28],
    l26: [10, 11, 12, 25, 26, 27, 40, 41, 42],
    l27: [5, 6, 7, 20, 21, 22, 35, 36, 37],
    l28: [14, 15, 16, 29, 30, 31, 44, 45, 46],
    l29: [6, 7, 8, 9, 10, 21, 22, 23, 24, 25],
    l30: [0, 1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 21]
};



function setUpGame() {
    if (lim == 31) {
        ptsd.innerText = "You Mastered!"
        return
    }
    grid.innerHTML = ''
    grid.style.gridTemplateColumns = `repeat(${width},${grid.offsetWidth / width + 'px'})`
    grid.style.height = grid.style.offsetWidth + "px"
    for (let i = 0; i < width * width; i++) {
        const pixel = document.createElement('div')
        pixel.className = 'pixel'
        pixel.id = 'px' + i
        pixel.style.width = grid.offsetWidth / width + 'px'
        pixel.style.height = grid.offsetHeight / width + 'px'
        grid.appendChild(pixel)
    }
    alienShooter = levels[`l${lvl++}`]

    lim = alienShooter.length
    pixels = Array.from(document.querySelectorAll('.grid div'));
    drawAliens()

}
setUpGame()

function drawAliens() {
    for (let i = 0; i < alienShooter.length; i++) {
        pixels[alienShooter[i]].classList.add('alien')
    }
}

let shooterPos = (width * width) - parseInt(width / 2) - 1
function placeShooter() {
    if (shooterPos % width != 0) {
        pixels[shooterPos - 1].classList.remove('shooter')
    }
    if (shooterPos % width < width - 1) {
        pixels[shooterPos + 1].classList.remove('shooter')
    }
    pixels[shooterPos].classList.add('shooter')

}
placeShooter()

function moveLeft() {
    if (shooterPos % width !== 0) {
        shooterPos--;
        placeShooter()
    }
}
function moveRight() {
    if (shooterPos % width < width - 1) {
        shooterPos++
        placeShooter()
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key == "ArrowLeft") {
        if (shooterPos % width !== 0) {
            shooterPos--;
            placeShooter()
        }
    }
    if (e.key == "ArrowRight") {
        if (shooterPos % width < width - 1) {
            shooterPos++
            placeShooter()
        }
    }
})

function removeAliens() {
    if (alienShooter.some(pos => pos > width * width)) window.location.reload()
    for (let i = 0; i < alienShooter.length; i++) {
        pixels[alienShooter[i]].classList.remove('alien')
    }
}
// setTimeout(removeAliens, 2000)

function moveAliens() {
    const isLeftEdge = alienShooter.some(position => position % width === 0);
    const isRightEdge = alienShooter.some(position => position % width === width - 1);
    removeAliens()
    if (isRightEdge && isGoingRght) {
        for (let i = 0; i < alienShooter.length; i++) {
            alienShooter[i] += width + 1
            dir = -1
            isGoingRght = false
        }
    }
    if (isLeftEdge && !isGoingRght) {
        for (let i = 0; i < alienShooter.length; i++) {
            alienShooter[i] += width - 1
            dir = 1
            isGoingRght = true
        }
    }
    for (let i = 0; i < alienShooter.length; i++) {
        alienShooter[i] += dir
    }

    drawAliens()
    if (pixels[shooterPos].classList.contains('alien')) {
        contents = "Game Over"
        typer()
        clearInterval(movId)
    }
    if (lvl == 31) ptsd.innerText = "Yayyy!!"

    if (deadAliens.length === lim) {
        contents = "Level " + lvl
        typer()
        lim = 0;
        deadAliens = [];
        setUpGame()

    }
}
let deadAliens = []

const movId = setInterval(moveAliens, 500)


function removeIndex(ind) {
    alienShooter.splice(ind, 1);
}
let tapps = false
function tapShoot() {
    tapps = true
    shoot()
}
function shoot(e) {
    let laserId
    let currentLaserIndex = shooterPos
    let sdInt

    function moveLaser() {
        pixels[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        pixels[currentLaserIndex].classList.add('laser')
        if (pixels[currentLaserIndex].classList.contains('alien')) {
            pixels[currentLaserIndex].classList.remove('laser')
            pixels[currentLaserIndex].classList.remove('alien')
            pixels[currentLaserIndex].classList.add('boom')
            setTimeout(() => { pixels[currentLaserIndex].classList.remove('boom') }, 500)
            clearInterval(laserId)
            const dead = alienShooter.indexOf(currentLaserIndex)
            deadAliens.push(dead)
            removeIndex(dead)
            if (!muted && plybom.duration > 0 && !plybom.paused) {
                plybom.pause()
                plybom.currentTime = 0;
                plybom.play()
            } else {
                plybom.play()
            }


        }
        if (currentLaserIndex < width) {

            pixels[currentLaserIndex].classList.remove('laser')
            clearInterval(laserId)
        }
    }
    if (tapps || e.key === 'ArrowUp' || e.key == ' ') {
        if (!muted && plysht.duration > 0 && !plysht.paused) {
            if (sdInt) clearInterval(sdInt)
            plysht.pause()
            plysht.currentTime = 0;
            plysht.play()
        } else {
            plysht.play()
            sdInt = setTimeout(() => plysht.pause(), 500)
        }

        laserId = setInterval(moveLaser, 100)
        tapps = false
    }

}
document.addEventListener('keydown', shoot)
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function typer() {
    let temp = ""
    for (let i = 0; i < contents.length; i++) {
        temp += contents[i]
        await delay(100)
        ptsd.innerText = temp
        if (!muted && plytyp.duration > 0 && !plytyp.paused) {
            plytyp.pause()
            plytyp.currentTime = 0;
            plytyp.play()
        } else {
            plytyp.play()
        }
    }
}

function mute() {
    if (muted) {
        muted = false;
        document.getElementById('muteIco').src = './assets/img/unmute.svg';
    } else {
        muted = true;
        document.getElementById('muteIco').src = './assets/img/mute.svg';
    }
}