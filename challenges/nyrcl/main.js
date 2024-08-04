const bgelement = document.createElement('video')
bgelement.src = "bg.mp4"
bgelement.autoplay = true;
bgelement.muted = true;
bgelement.loop = true;


var svgel = `<svg viewBox="0 0 300 200" id="val">
    <text x="50%" y="50%" text-anchor="middle" class="texty">
        NYRCL
    </text>
</svg>`

const circlesvg = `<svg  viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<path id="circlePath" d="
M 10, 50
a 40,40 0 1,1 80,0
40,40 0 1,1 -80,0
" />
<text>
    <textPath href="#circlePath">
        Newyork Recreational Cricket League 
        
    </textPath>
</text>
</svg>`
const svgdiv = document.createElement('div');
svgdiv.innerHTML = svgel;
svgdiv.className = "headerlogo"
const svgdivs = document.createElement('div');
svgdivs.innerHTML = circlesvg;
svgdivs.className = "stamp"

document.getElementsByTagName('header')[0].append(bgelement)
document.body.append(svgdivs)
document.body.append(svgdiv)

const mid3s = document.getElementsByTagName('section')

mid3s[2].style.display = "none"
mid3s[3].style.display = "none"

let modifiedS3 = `<i class="fa-solid fa-shirt"></i>`

const mapelement = document.createElement('div')
mapelement.className = "mapHolder"
const iFra = document.createElement("iframe")
iFra.src = `https://maps.google.com/maps?q=40.7825625,-73.9681374&z=17&output=embed`
mapelement.append(iFra)


const directionButton = document.createElement('a')
directionButton.className = "direction"
directionButton.href = "https://www.google.com/maps/dir//40.7825625,-73.9681374/@40.782563,-73.968137,659m/data=!3m1!1e3!5m1!1e1?entry=ttu"
directionButton.target = "_blank"
directionButton.innerHTML = `<i class="fa-solid fa-location-arrow"></i> Directions`

const formel = document.createElement('div')
formel.innerHTML = `<div class="form">
<h1>Enter Details</h1>
<div class="field">
    <input placeholder="Enter Name" minlength="5" maxlength="20" type="text" id="username" />
</div>
<div class="field">
    <input placeholder="Enter Email" type="email" id="email" />
</div>
<div class="field">
    <button>I'm Interested</button>
</div>
</div>`
formel.className = "signupform"
formel.id = "form"

const feesDiv = document.createElement("div")
feesDiv.className = "illustrations"
feesDiv.innerHTML = `<span class="material-symbols-outlined">add_box</span><span><i class="fa-solid fa-shirt"></i></span>
 <span class="material-symbols-outlined">sports_cricket</span>`





const bannerEnd = document.createElement('div')
const bannerTagLine = document.createElement('h1')
bannerTagLine.innerText = `"New Season, New Chapter!"`
bannerEnd.append(bannerTagLine)
bannerEnd.className = "end-banner"
const btn = document.createElement("a")
btn.className = "seas"
btn.setAttribute("href", "#form")
btn.innerText = "Join the Champions!"
const mid3se = document.createElement('section')
const bbl =
    `<section><span>${mid3s[1].innerHTML}</span><span>${formel.outerHTML}</span></section><section><span class="fee1">${mid3s[2].innerHTML}</span><span class="fee2">${feesDiv.outerHTML}</span></section><section class="locations"><span>${mid3s[3].innerHTML + directionButton.outerHTML}</span> <span>${mapelement.innerHTML}</span></section>`
mid3s[1].innerHTML = bbl
const footer = document.querySelector("footer:last-of-type")

footer.insertAdjacentElement('beforebegin', bannerEnd);

const endMsg = document.createElement('div')
endMsg.innerHTML = `Submitted for Frontend Challenge v24.07.24 by&nbsp;<a href="https://rith1x.github.io"> @rith1x</a>`
endMsg.className = "endmsg"
footer.insertAdjacentElement('afterend', endMsg)
footer.insertAdjacentElement('afterbegin', btn)
