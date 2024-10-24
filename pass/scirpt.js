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