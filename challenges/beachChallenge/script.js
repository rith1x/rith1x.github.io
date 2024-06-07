const vid = document.createElement('video');
vid.src = "1739010-hd_1920_1080_30fps.mp4"
vid.autoplay = true;
vid.loop = true;
vid.muted = true;
const header = document.getElementsByTagName('header')

header[0].appendChild(vid)
const banner_btn = document.createElement('button');
banner_btn.innerText = "Lets go"
header[0].appendChild(banner_btn)

const surfer = document.createElement('img');
surfer.src = "Surfer-pana.svg";
surfer.className = "surfer"
document.body.appendChild(surfer)

const pad = document.createElement('div')
pad.className = "padder"
document.getElementsByTagName('main')[0].appendChild(pad)

const h2tgs = document.getElementsByTagName('h2');
h2tgs[1].innerHTML = 'Top Beaches <i class="fa-solid fa-umbrella-beach"></i>'


let tags = [['<i class="fa-solid fa-person-swimming"></i>swim', '<i class="fa-solid fa-sun"></i>sunbath', '<i class="fa-solid fa-star"></i>reef'],
['<i class="fa-solid fa-water"></i>snorkel', '<i class="fa-solid fa-person-praying fa-rotate-90" style="color: #0e0038;"></i>dive', '<i class="fa-solid fa-hotel"></i>resort'],
['<i class="fa-solid fa-person-praying fa-rotate-90" style="color: #0e0038;"></i>dive', '<i class="fa-solid fa-leaf"></i>nature'],
['<i class="fa-solid fa-sailboat"></i>boat'],
['<i class="fa-solid fa-landmark"></i>historic'],
['<i class="fa-solid fa-camera"></i>photography', '<i class="fa-solid fa-water"></i>snorkel', '<i class="fa-solid fa-dove"></i>relax'],
['<i class="fa-solid fa-screwdriver"></i>paddleboarding', '<i class="fa-solid fa-water"></i>snorkel', '<i class="fa-solid fa-champagne-glasses"></i>bar', '<i class="fa-solid fa-hotel"></i>hotels'],
['<i class="fa-solid fa-heart"></i>honeymoon', '<i class="fa-solid fa-dollar-sign"></i>luxury', '<i class="fa-solid fa-hand-peace"></i>tranquility'],
['<i class="fa-solid fa-person-swimming"></i>swim', '<i class="fa-solid fa-screwdriver"></i>kayaking', '<i class="fa-solid fa-mountain-sun"></i>view'],
['<i class="fa-solid fa-bucket"></i>beachcombing', '<i class="fa-solid fa-person-swimming"></i>swim', '<i class="fa-solid fa-dove"></i>relax']
]
let liels = document.getElementsByTagName('li')
for (let i = 0; i < liels.length; i++) {
    const spandiv = document.createElement('div')
    tags[i].forEach((el) => {
        const tagSpan = document.createElement('span')
        tagSpan.innerHTML = el;
        spandiv.append(tagSpan)
    })
    liels[i].prepend(spandiv)
}