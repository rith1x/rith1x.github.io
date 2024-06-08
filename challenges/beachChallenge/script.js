const vid = document.createElement('video');
vid.src = "1739010-hd_1920_1080_30fps.mp4"
vid.autoplay = true;
vid.loop = true;
vid.muted = true;
const header = document.getElementsByTagName('header')

header[0].appendChild(vid)
const banner_btn = document.createElement('a');
banner_btn.innerText = "Lets go"
banner_btn.href = "#list"
header[0].appendChild(banner_btn)

const surfer = document.createElement('img');
surfer.src = "Surfer-pana.svg";
surfer.className = "surfer"
document.body.appendChild(surfer)

const pad = document.createElement('div')
pad.className = "padder"
document.getElementsByTagName('main')[0].appendChild(pad)

const sections = document.getElementsByTagName('section')
sections[0].id = 'list';



const h2tgs = document.getElementsByTagName('h2');
h2tgs[1].innerHTML = 'Top Beaches <i class="fa-solid fa-umbrella-beach"></i>'


let tagsvg = [['<i class="fa-solid fa-person-swimming"></i>', '<i class="fa-solid fa-sun"></i>', '<i class="fa-solid fa-star"></i>'],
['<i class="fa-solid fa-water"></i>', '<i class="fa-solid fa-person-praying"></i>', '<i class="fa-solid fa-hotel"></i>'],
['<i class="fa-solid fa-person-praying"></i>', '<i class="fa-solid fa-leaf"></i>'],
['<i class="fa-solid fa-sailboat"></i>'],
['<i class="fa-solid fa-landmark"></i>'],
['<i class="fa-solid fa-camera"></i>', '<i class="fa-solid fa-water"></i>', '<i class="fa-solid fa-dove"></i>'],
['<i class="fa-solid fa-screwdriver"></i>', '<i class="fa-solid fa-water"></i>', '<i class="fa-solid fa-champagne-glasses"></i>', '<i class="fa-solid fa-hotel"></i>'],
['<i class="fa-solid fa-heart"></i>', '<i class="fa-solid fa-dollar-sign"></i>', '<i class="fa-solid fa-hand-peace"></i>'],
['<i class="fa-solid fa-person-swimming"></i>', '<i class="fa-solid fa-screwdriver"></i>', '<i class="fa-solid fa-mountain-sun"></i>'],
['<i class="fa-solid fa-bucket"></i>', '<i class="fa-solid fa-person-swimming"></i>', '<i class="fa-solid fa-dove"></i>']
]

let tags = [['swim', 'sunbath', 'reef'], ['snorkel', 'dive', 'resort'], ['dive', 'nature'], ['boat'], ['historic'], ['photography', 'snorkel', 'relax'], ['paddleboarding', 'snorkel', 'bar', 'hotels'], ['honeymoon', 'luxury', 'tranquility'], ['swim', 'kayaking', 'view'], ['beachcombing', 'swim', 'relax']];


let liels = document.getElementsByTagName('li')
for (let i = 0; i < liels.length; i++) {
    liels[i].className = "hide"

    const topRow = document.createElement('div')

    const spandiv = document.createElement('div')
    spandiv.className = "tagsdiv"
    for (let j = 0; j < tags[i].length; j++) {

        const singletag = document.createElement('div')
        singletag.className = "tag"
        const tagSpan = document.createElement('div')
        tagSpan.className = "tagicon"
        tagSpan.innerHTML = tagsvg[i][j];
        const tagText = document.createElement('div')
        tagText.className = "tagtext"

        tagText.innerText = tags[i][j]
        singletag.append(tagSpan, tagText)
        singletag.title = tags[i][j].toString()
        spandiv.append(singletag)
    }
    const wish = document.createElement('button')
    wish.innerHTML = '<i class="fa-regular fa-heart"></i>'
    wish.onclick = (e) => { likeToggle(i) }
    wish.id = `Like${i}`
    wish.className = "wish"
    const wea = document.createElement('div');
    wea.className = "weather"
    wea.id = `Weather${i}`

    const rct = document.createElement('div')
    rct.appendChild(wea)
    rct.appendChild(wish)

    topRow.className = "toprow"
    topRow.appendChild(spandiv)
    topRow.appendChild(rct)
    liels[i].prepend(topRow)
}
weatherUpdate()
function doObserve() {
    for (let i = 0; i < liels.length; i++) {
        observer.observe(liels[i]);
    }

}
let likeStatus = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
function likeToggle(beach) {
    if (likeStatus[beach] == 0) {
        document.getElementById(`Like${beach}`).innerHTML = '<i class="fa-solid fa-heart"></i>'
        likeStatus[beach] = 1;
        document.getElementById(`Like${beach}`).classList.add("liked")
        document.getElementById(`Like${beach}`).style.animationPlayState = "running"
    } else {
        document.getElementById(`Like${beach}`).innerHTML = '<i class="fa-regular fa-heart"></i>'
        likeStatus[beach] = 0;
        document.getElementById(`Like${beach}`).classList.remove("liked")

    }

}
likeStatus.forEach((el) => { likeToggle(el) })


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.className = 'show'; }
        else { entry.target.className = 'hide'; }
    });
}, { threshold: 0.4 });


const ul = document.getElementsByTagName('ul')
ul[0].onscroll = (e) => {
    doObserve();
}
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.body.onscroll = (e) => {
    if (isElementInViewport(h2tgs[1])) {
        doObserve();
    }
}



async function weatherUpdate() {
    const h3els = document.getElementsByTagName('h3')
    for (let j = 0; j < h3els.length; j++) {
        let curr_location = h3els[j].innerText;
        fetch(`https://wttr.in/${location}?format=j2`)

            .then(response => response.json())
            .then(data => {
                weather = data;
                const avgtempC = weather.current_condition[0].temp_C;
                const location = weather.nearest_area[0].areaName[0].value;
                console.log(clWeather, cloc)
            })
            .catch((err) => { console.log(err) })
    }
}