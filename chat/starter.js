function createRoom() {
    storeName()

    cody = codeGenerator();
    window.location.href = `chat.html?r=${cody}`;
}
function joinRoom() {
    storeName()
    jrCode = document.getElementById("roomcode").value;
    window.location.href = `chat.html?r=${jrCode}`;


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
    var currName = document.getElementById("name").value;
    localStorage.setItem("chatName", currName);
}
