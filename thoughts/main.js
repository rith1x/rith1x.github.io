
const quoteel = document.getElementById("quote");
const authel = document.getElementById("author")
const backdrop = document.getElementById('backdrop')


function capture() {
    domtoimage.toBlob(document.getElementById('canvas'), {
        quality: 2,
    })
        .then(function (blob) {
            saveAs(blob, 'export.png');
        });
}


let f = 0;
function changeFont() {
    const fonts = ["Libre Caslon Text",
        "Playfair Display",
        "EB Garamond",
        "DM Serif Display", "Cedarville Cursive", 'Clash Display', 'Zodiak', 'Sentient', 'Boska', 'Bonny', 'Bebas Neue', 'Baskervville SC',
        'Pacifico']
    f += 1;
    if (f >= fonts.length) f = 0
    document.getElementById("canvas").style.fontFamily = fonts[f];

}
let bold = 0
function changeBold() {
    if (bold == 0) {
        bold = 1
        quoteel.style.fontWeight = "bolder";
        authel.style.fontWeight = "bolder";

    } else {
        bold = 0
        quoteel.style.fontWeight = "normal";
        authel.style.fontWeight = "normal";

    }
}
let ital = 0
function changeItalic() {
    if (ital == 0) {
        ital = 1
        quoteel.style.fontStyle = "italic";
        authel.style.fontStyle = "italic";

    } else {
        ital = 0
        quoteel.style.fontStyle = "normal";
        authel.style.fontStyle = "normal";

    }
}
let wght = 100
function changeWeight() {
    if (wght == 1000) wght = 100
    quoteel.style.fontWeight = wght;
    authel.style.fontWeight = wght;
    wght += 100
}

let fSize = 28

function fontSizeI() {
    if (fSize <= 40) {
        fSize++
        quoteel.style.fontSize = fSize + "px";
    }
}
function fontSizeD() {
    if (fSize > 12) {
        fSize--
        quoteel.style.fontSize = fSize + "px";
    }
}
let lhght = 1.15
function changeLineHeight() {
    lhght += .05
    quoteel.style.lineHeight = lhght
    if (lhght > 2.00) lhght = 0.05
}

let sz = 95

function bgAdjust() {
    if (sz <= 300) {
        sz += 5
        backdrop.style.backgroundSize = sz + "%"
    } else {
        sz = 100;
    }
}
let blur = 0


function glassEffect() {
    if (mapping.blur < 25)
        mapping.blur++
    else
        mapping.blur = 0
    filterApplication()
}

function bgSaturate() {
    if (mapping.saturate <= 4)
        mapping.saturate += .2
    else
        mapping.saturate = 0
    filterApplication()
}
function bgHue() {
    if (mapping.hue <= 350)
        mapping.hue += 10
    else
        mapping.hue = 0
    filterApplication()
}
function bgSepia() {
    if (mapping.sepia <= 2)
        mapping.sepia += .1
    else
        mapping.sepia = 0
    filterApplication()
}
const mapping = {
    blur: 0,
    saturate: 1,
    hue: 0,
    sepia: 0
}

function filterApplication() {
    backdrop.style.filter = `saturate(${mapping.saturate}) blur(${mapping.blur}px) hue-rotate(${mapping.hue}deg) sepia(${mapping.sepia})`

}
let auth = 'r'
function alignAuthor() {
    if (auth == 'r') {
        auth = 'l'
        authel.style.alignSelf = "flex-start"
    } else if (auth == 'l') {
        auth = 'c'
        authel.style.alignSelf = "center"
    } else {
        auth = 'r'
        authel.style.alignSelf = "flex-end"
    }
}

let fnt = 0

function tamilFont() {
    if (fnt < 38)
        fnt++
    else
        fnt = 0

    quoteel.style.fontFamily = `f${fnt}`

}