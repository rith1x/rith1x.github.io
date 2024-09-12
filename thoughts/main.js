
const quoteel = document.getElementById("quote");
const authel = document.getElementById("author")
const backdrop = document.getElementById('backdrop')
const tintel = document.getElementById('tint')
const cardel = document.getElementById('card')
const canvaas = document.getElementById('canvas')


function capture() {
    // domtoimage.toBlob(document.getElementById('canvas'), {
    //     quality: 2,
    // })
    //     .then(function (blob) {
    //         saveAs(blob, 'export.png');
    //     });

    document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
            
            // domtoimage
            //     .toJpeg(document.getElementById('canvas'), { quality: 1.0, width: canvaas.offsetWidth * 3, height: canvaas.offsetHeight * 3 })
            //     .then(function (dataUrl) {
            //         var link = document.createElement('a');
            //         link.download = 'my-image-name.jpeg';
            //         link.href = dataUrl;
            //         link.click();
            //     });

            // Select all elements inside the body
            // const allElements = document.querySelectorAll('body *');

            // Loop through each element and apply the scale
            // allElements.forEach((element) => {
            //     element.style.transform = 'scale(3)';
            //     element.style.transformOrigin = 'top left'; // Ensure the scale happens from the top-left
            // });


            // domtoimage.toBlob(document.getElementById('canvas'), {
            //     quality: 2, width: canvaas.offsetWidth * 3, height: canvaas.offsetHeight * 3
            // })
            //     .then(function (blob) {
            //         saveAs(blob, 'export.png');
            //     });
            // allElements.forEach((element) => {
            //     element.style.transform = 'scale(1)'; // Reset the scale back to normal
            // });

            html2canvas(canvaas, {
                scale: 5,
                width: canvaas.scrollWidth - 1,
                height: canvaas.scrollHeight - 1
            }).then(canvas => {
                var dataUrl = canvas.toDataURL("image/jpeg");
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'quote.png';

                a.click();
            });


            // domtoimage.toPng(canvaas)
            //     .then(function (dataUrl) {
            //         var img = new Image();
            //         img.src = dataUrl;

            //         // Convert the data URL to a Blob
            //         var byteString = atob(dataUrl.split(',')[1]);
            //         var mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

            //         var ab = new ArrayBuffer(byteString.length);
            //         var ia = new Uint8Array(ab);
            //         for (var i = 0; i < byteString.length; i++) {
            //             ia[i] = byteString.charCodeAt(i);
            //         }

            //         var blob = new Blob([ab], { type: mimeString });

            //         // Use FileSaver.js to save the blob as an image file
            //         saveAs(blob, 'image.png');
            //     })
            //     .catch(function (error) {
            //         console.error('oops, something went wrong!', error);
            //     });


        })
    })



}
function changeFont() {
    document.getElementById("canvas").style.fontFamily = document.getElementById('fonFam').value;
    console.log(document.getElementById('fonFam').value)
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
function changeWeight() {
    quoteel.style.fontWeight = document.getElementById('fWIp').value;
    authel.style.fontWeight = document.getElementById('fWIp').value;
}
function changeWeightx() {
    document.getElementById('fWIp').value = document.getElementById('fonWei').value
    changeWeight()
}


let fSize = 28

function fontSizeI() {
    if (fSize <= 40) {
        fSize++
        document.getElementById('fsz').value = fSize
    }
    fontSize()

}
function fontSizeD() {
    if (fSize > 12) {
        fSize--
        document.getElementById('fsz').value = fSize
    }
    fontSize()
}
function fontSize() {
    let fsz = parseInt(document.getElementById('fsz').value)
    if (fsz >= 12 && fsz <= 65)
        fSize = fsz
    quoteel.style.fontSize = fSize + "px";

}
let lhght = 1.15
function changeLineHeight() {
    let lh = parseFloat(document.getElementById('lhIp').value)
    console.log(lh)
    if (lh >= 0.05 && lh <= 2.00)
        lhght = lh
    quoteel.style.lineHeight = lhght
}
function changeLineHeightx() {
    document.getElementById('lhIp').value = parseFloat(document.getElementById('lhIpx').value)
    changeLineHeight()
}
let sz = 95

function bgAdjust() {
    if (sz <= 400) {
        sz += 5
        backdrop.style.backgroundSize = sz + "%"
    } else {
        sz = 100;
    }
}
let blur = 0


function glassEffectx() {
    document.getElementById('bFil').value = parseInt(document.getElementById('bFilx').value)
    glassEffect()
}
function glassEffect() {
    let bval = parseFloat(document.getElementById('bFil').value)
    if (bval >= 0 && bval <= 20)
        mapping.blur = bval
    filterApplication()
}

function bgSaturatex() {
    document.getElementById('sFil').value = parseFloat(document.getElementById('sFilx').value)
    bgSaturate()
}
function bgSaturate() {
    let sval = parseFloat(document.getElementById('sFil').value)
    mapping.saturate = sval
    filterApplication()
}
function bgHuex() {
    document.getElementById('hFil').value = parseFloat(document.getElementById('hFilx').value)
    bgHue()
}
function bgHue() {
    let hval = parseFloat(document.getElementById('hFil').value)
    mapping.hue = hval
    filterApplication()
}
// function bgSepia() {
//     if (mapping.sepia <= 2)
//         mapping.sepia += .1
//     else
//         mapping.sepia = 0
//     filterApplication()
// }
const mapping = {
    blur: 0,
    saturate: 1,
    hue: 0
}

function filterApplication() {
    backdrop.style.filter = `saturate(${mapping.saturate}) blur(${mapping.blur}px) hue-rotate(${mapping.hue}deg)`

}
let auth = 'r'
function alignAuthor() {
    if (auth == 'r') {
        auth = 'l'
        document.getElementById("authAl").innerText = "Left"
        authel.style.alignSelf = "flex-start"
    } else if (auth == 'l') {
        auth = 'c'
        document.getElementById("authAl").innerText = "Center"

        authel.style.alignSelf = "center"
    } else {
        auth = 'r'
        document.getElementById("authAl").innerText = "Right"

        authel.style.alignSelf = "flex-end"
    }
}
let alqte = 'l'
function alignQuote() {
    if (auth == 'r') {
        auth = 'l'
        document.getElementById("qteAl").innerText = "Left"
        quoteel.style.textAlign = "left"
    } else if (auth == 'l') {
        auth = 'c'
        document.getElementById("qteAl").innerText = "Center"
        quoteel.style.textAlign = "center"

    } else if (auth == 'c') {
        auth = 'j'
        document.getElementById("qteAl").innerText = "Justify"
        quoteel.style.textAlign = "justify"



    } else {
        auth = 'r'
        document.getElementById("qteAl").innerText = "Right"
        quoteel.style.textAlign = "right"

    }
}

let fnt = 0


const tint = {
    opacity: 0,
    clr: '#000000',
}
function tintColor() {
    tint.clr = document.getElementById('tcl').value
    tintBg()
}


function tintOpacityx() {
    document.getElementById('tOp').value = parseInt(document.getElementById('tOpx').value)
    tintOpacity()
}


function tintOpacity() {
    let tOp = parseInt(document.getElementById('tOp').value)
    if (tOp <= 255 && tOp >= 0)
        tint.opacity = tOp
    tintBg()
}
function tintBg() {
    tintel.style.background = `${tint.clr}${tint.opacity.toString(16)}`
}
function qteClr() {
    quoteel.style.color = document.getElementById('qcl').value
    authel.style.color = document.getElementById('qcl').value
}

let br = 0
function borderRadx() {
    document.getElementById('bRad').value = parseInt(document.getElementById('bRadx').value)
    borderRad()
}
function borderRad() {
    let brr = parseInt(document.getElementById('bRad').value)
    if (brr >= 0 && brr <= 50)
        br = brr
    cardel.style.borderRadius = br + "px"
}
function changeBg() {
    const file = document.getElementById('bgIm').files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('canvas').style.backgroundImage = `url(${e.target.result})`;
            backdrop.style.background = `url(${e.target.result})`;
            backdrop.style.backgroundSize = 'cover'
            backdrop.style.backgroundPosition = 'center'
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
}

const borde = {
    style: "solid",
    width: 0,
    color: '#ffffff'
}
function bordColor() {
    borde.color = document.getElementById('bcl').value
    setBorder()
}

function borderSizex() {
    document.getElementById('bsIp').value = document.getElementById('bsIpx').value
    borderSize()
}

function borderSize() {
    let bs = parseInt(document.getElementById('bsIp').value)
    if (bs <= 10 && bs >= 0)
        borde.width = bs
    setBorder()
}


let xz = 0
let stylz = ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none']
function borderStyle() {
    borde.style = stylz[parseInt(document.getElementById('bsxIp').value)]
    setBorder()
}

function setBorder() {
    cardel.style.border = `${borde.style} ${borde.width}px ${borde.color}`
}

function openUpSettings() {
    const chn = document.getElementById('selector').children

    for (let i = 1; i < chn.length; i++)
        chn[i].style.display = "none"

    document.getElementById('selector').style.transform = "translateY(0%)"
}
function closeSettings() {
    document.getElementById('selector').style.transform = "translateY(100%)"

}
function showBgCtrls() {
    openUpSettings()
    document.getElementById('settingss').style.display = "block"
}

showBgCtrls()
function bgSzValChange() { document.getElementById('bgSzIp').value = document.getElementById('bgSz').value; bgSzChg() }
function bgAxXValChange() { document.getElementById('bgAxXIp').value = document.getElementById('bgAxX').value; bgxChg() }
function bgAxYValChange() { document.getElementById('bgAxYIp').value = document.getElementById('bgAxY').value; bgyChg() }
function cvSzx() { document.getElementById('cvSz').value = document.getElementById('cvSzx').value; cvSz() }
function cvAxx() { document.getElementById('cvAx').value = document.getElementById('cvAxx').value; cvAx() }
function cvAyx() { document.getElementById('cvAy').value = document.getElementById('cvAyx').value; cvAy() }

function bgSzChg() {
    canvaas.style.backgroundSize = parseInt(document.getElementById('bgSzIp').value) + "%"
}
function bgxChg() {
    canvaas.style.backgroundPositionX = parseInt(document.getElementById('bgAxXIp').value) + "%"
}
function bgyChg() {
    canvaas.style.backgroundPositionY = parseInt(document.getElementById('bgAxYIp').value) + "%"
}
function cvSz() {
    backdrop.style.backgroundSize = parseInt(document.getElementById('cvSz').value) + "%"
}
function cvAx() {
    backdrop.style.backgroundPositionX = parseInt(document.getElementById('cvAx').value) + "%"
}
function cvAy() {
    backdrop.style.backgroundPositionY = parseInt(document.getElementById('cvAy').value) + "%"
}
