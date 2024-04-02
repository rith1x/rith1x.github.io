function createRoom() {
    var chk = storeName()
    if (chk) {
        let cody = codeGenerator();
        window.location.href = `chat.html?r=${cody}`;
    }

}
function joinRoom() {
    var chk = storeName()
    if (chk) {
        var jrCode = document.getElementById("roomcode").value.toUpperCase();
        window.location.href = `chat.html?r=${jrCode}`;
    }

}
function codeGenerator() {
    let vals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let code = "";
    while (code.length != 6) {
        code += vals[Math.floor(Math.random() * vals.length)];
    }
    return code;

}
function storeName() {
    let currName = document.getElementById("name").value;
    let spaceCheck = !currName.replace(/\s/g, '').length;
    if (spaceCheck) {
        alert("Valid Name Only!");
        return false;
    } else {

        localStorage.setItem("chatName", currName);
        return true;
    }

}
var localName = localStorage.getItem("chatName");
console.log(localName)
console.log("tets")
if (localName != null) {
    document.getElementById("name").value = localName;
}
