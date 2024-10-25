document.querySelectorAll('.num').forEach(el => {
    el.addEventListener('keydown', (e) => checkBS(e))
})
document.getElementById('dig1').focus()

function focii(pos) {
    if (document.getElementById(`dig${pos}`).value.length == 1) {
        document.getElementById(`dig${parseInt(pos) + 1}`).focus()
    }
}
function validateLock() {
    let code = ''
    for (let i = 1; i < 7; i++) {
        code += document.getElementById(`dig${i}`).value
    }
    console.log(code)
    if (checkLockKey(code)) {
        console.log("Success")

        validPass()
        document.getElementById('lock').style.display = 'none'
    } else {
        console.log('Failed')
        wrongPass()
    }
}
function wrongPass() {
    document.querySelectorAll('.num').forEach((el, i) => {
        el.style.border = 'solid 1px #ab0047'
        el.style.color = "#ab0047"
        el.value = ''
        if (i == 0) el.focus()

    })
}
function validPass() {
    document.querySelectorAll('.num').forEach(el => {
        el.style.border = 'solid 1px #00ab47'
        el.style.color = "#00ab47"
    })
}

function checkBS(event) {
    if (event.key === 'Backspace' && parseInt(event.target.id[3]) != 1) {
        document.getElementById(event.target.id).value = ''
        document.getElementById(`dig${parseInt(event.target.id[3]) - 1}`).focus()
    } else if (event.key === 'Backspace' && parseInt(event.target.id[3]) == 1) validPass()

}

function checkLockKey(pass) {

    if (localStorage.getItem('lockKey') == null) {
        let mK = prompt("Enter encryption key (internal)")
        localStorage.setItem('lockKey', enCrypt(pass, mK))
        localStorage.setItem('miniKey', mK)
        return true
    } else if (deCrypt(localStorage.getItem('lockKey'), localStorage.getItem('miniKey')) == pass) {
        return true
    }
    return false

}

function enCrypt(d, k) {
    let enc = CryptoJS.AES.encrypt(d, k).toString();
    let val = ''
    for (let i = 0; i < enc.length; i++) {
        if (i >= 9) val += enc[i]
    }
    return val
}
function deCrypt(d, k) {

    return CryptoJS.AES.decrypt('U2FsdGVkX' + d, k).toString(CryptoJS.enc.Utf8);
}
console.log()


let pass = [{
    name: "Amazon",
    email: "laila@123.in",
    password: "19NBpeW3BHchNHrjIf9d18xxS3vQXxtC60=",
    notes: "this is a note",
    url: "https://github.com",

}, {
    name: "Samsung",
    email: "Mohan@123.in",
    password: "",
    notes: "",
    url: "",
}, {
    name: "Apple",
    email: "Supra@123.in",
    password: "",
    notes: "",
    url: "",
}]

//<div class="pass" >
//<div class="pass-left">
//<div class="pass-icon">
//<img src="https://ui-avatars.com/api/?name=Laila&background=random" alt="">
//</div>
//<div class="pass-info">
//<h3 class="pass-name">Amazon</h3>
//<p class="pass-email">kiruthikx@gmail.com</p>
//</div>
//</div>
//<div class="pass-rght">

//</div>
//</div >
function loadPasswords() {
    const pwBox = document.getElementById('passwords')

    pass.forEach((pw, index) => {
        const passDiv = document.createElement('div')
        passDiv.className = "pass"
        passDiv.setAttribute('onclick', `showData(${index})`)
        const passLeft = document.createElement('div')
        passLeft.className = "pass-left"
        const passIcon = document.createElement('div')
        passIcon.className = "pass-icon"
        const passImg = document.createElement('img')
        passImg.src = `https://ui-avatars.com/api/?name=${pw.name}&background=random`
        passIcon.append(passImg)
        const passInfo = document.createElement('div')
        passInfo.className = "pass-info"
        const passName = document.createElement('h3')
        passName.innerText = pw.name
        const passEmail = document.createElement('p')
        passEmail.innerText = pw.email
        passInfo.append(passName, passEmail)
        passLeft.append(passIcon, passInfo)
        const passRght = document.createElement('div')
        passRght.className = "pass-rght"
        passRght.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>`
        passDiv.append(passLeft, passRght)
        pwBox.append(passDiv)
    })
}
loadPasswords()

function showData(id) {
    document.getElementById('passTitle').innerText = pass[id].name
    document.getElementById('passImg').src = `https://ui-avatars.com/api/?name=${pass[id].name}&background=random`
    document.getElementById('passEmail').value = pass[id].email
    document.getElementById('passPass').value = pass[id].password
    document.getElementById('passLink').href = pass[id].url
    document.getElementById('passUrl').innerText = pass[id].url
    document.getElementById('passNotes').value = pass[id].notes
    document.getElementById('passPop').style.transform = 'translateY(0)'




}
function popClose() {
    document.getElementById('passPop').style.transform = 'translateY(100%)'

}

function copyPass() {

}
async function copyEmail() {
    var stg = document.getElementById('passEmail').value
    navigator.clipboard.writeText(stg)
        .then(function () { console.log() })
}
let pvs = false
let epa = ''
function togglePass() {
    if (!pvs) {
        document.getElementById('passPass').type = 'text'
        epa = document.getElementById('passPass').value
        document.getElementById('passPass').value = deCrypt(epa, prompt("Key"))
        pvs = true
    } else {
        document.getElementById('passPass').type = 'password'
        document.getElementById('passPass').value = epa

        pvs = false
    }
}