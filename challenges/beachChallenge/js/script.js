const header = document.getElementsByTagName('header')
const sections = document.getElementsByTagName('section')
const h2tgs = document.getElementsByTagName('h2');
let liels = document.getElementsByTagName('li')
const h3els = document.getElementsByTagName('h3')
const ul = document.getElementsByTagName('ul')

const vid = document.createElement('video');
vid.src = "1739010-hd_1920_1080_30fps.mp4"
vid.autoplay = true;
vid.loop = true;
vid.muted = true;
header[0].appendChild(vid)

const banner_btn = document.createElement('a');
banner_btn.innerText = "Lets go"
banner_btn.href = "#list"
header[0].appendChild(banner_btn)

const surfdiv = document.createElement('div')
surfdiv.className = "surfdiv"
document.body.append(surfdiv)

const pad = document.createElement('div')
pad.className = "padder"
document.getElementsByTagName('main')[0].appendChild(pad)
sections[0].id = 'list';

const nowShowing = document.createElement('div')
nowShowing.className = "nowShowing"
nowShowing.innerText = ""
nowShowing.id = "nowShowing"
sections[1].append(nowShowing);
h2tgs[1].innerHTML = 'Top Beaches <i class="fa-solid fa-umbrella-beach"></i>'
h2tgs[1].style.fontFamily = "Synonymb"
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

for (let i = 0; i < liels.length; i++) {
    liels[i].className = "hide"
    liels[i].id = i;
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
    rct.className = "rct"
    rct.appendChild(wea)
    rct.appendChild(wish)
    topRow.className = "toprow"
    topRow.appendChild(spandiv)
    topRow.appendChild(rct)
    liels[i].prepend(topRow)
}
fakeWeather()

function doObserve() {
    for (let i = 0; i < liels.length; i++) {
        observer.observe(liels[i]);
    }
}

let likeStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.className = 'show';
        }
        else { entry.target.className = 'hide'; }
    });
}, { threshold: 0.4 });


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
    } else if (isElementInViewport(ul[0])) {
        doObserve();
    }
}


function fakeWeather() {
    for (let j = 0; j < h3els.length; j++) {
        let curr_location = (h3els[j].innerText.split(','))[1];
        let weather = ((Math.random() * 10) + 20).toFixed(0)
        document.getElementById(`Weather${j}`).innerHTML = curr_location + `&nbsp;<span>${weather}°C</span>`
    }
}

const footer = document.createElement('div')
const footernotes = document.createElement('div')
footernotes.innerHTML = `<span>Designed by <a href="https://dev.to/rith1x"><i class="fa-brands fa-dev"></i>&nbsp;rith1x</a></span><span>Frontend Challenge v24.05.29</span>`
const attr = document.createElement('span')
attr.innerText = "Icons by FontAwesome, Video by Pexels, Image by Adobe Firefly"
footernotes.appendChild(attr)
footer.className = 'footer'
footer.innerHTML = `<svg id="wavePath" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,154.7C672,117,768,75,864,69.3C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>`
footer.append(footernotes)
document.body.appendChild(footer)