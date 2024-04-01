

const firebaseConfig = {
    apiKey: "AIzaSyD6KJ-ZZGsThD1aAxSpaZHsuPMmG-dvYqE",
    authDomain: "chatx-29ff8.firebaseapp.com",
    projectId: "chatx-29ff8",
    databaseURL: "https://chatx-29ff8-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "chatx-29ff8.appspot.com",
    messagingSenderId: "1007710976666",
    appId: "1:1007710976666:web:71c3895500b964d816fd23"
};

let c = firebase.initializeApp(firebaseConfig);



function codeGenerator() {
    let vals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let code = "";
    while (code.length != 6) {
        code += vals[Math.floor(Math.random() * vals.length)];
    }
    return code;

}
let currentRoom;
let currSender = "Kiruthik";
function createRoom() {
    cody = codeGenerator();
    window.location.href = `chat.html?r=${cody}`;
}
function joinRoom() {
    jrCode = document.getElementById("roomcode").value;
    window.location.href = `chat.html?r=${jrCode}`;


}
function chatLoad() {
    // currentRoom = codeGenerator();
    currurl = window.location.href;
    spliced = currurl.split("?r=");
    codie = spliced[1];
    console.log(codie)
    currentRoom = codie
    document.getElementById("code").innerText = codie;
}
function sendMessage() {
    var messageel = document.getElementById("message");
    var message = messageel.value;

    if (message != " " || message != "") {
        timex = geTime();
        firebase.database().ref("ROOMS").child(currentRoom).push().set({
            "sender": currSender,
            "message": message,
            "time": timex
        })

            .then(() => {
                console.log("Message sent successfully");
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    }
    messageel.value = ""
}
function geTime() {

    const now = new Date();
    times = `${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${(now.getMinutes() / 10 < 1) ? "0" + now.getMinutes() : now.getMinutes()}${now.getHours() > 12 ? "PM" : "AM"}`;


    return times
}
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage()
    }
})
firebase.database().ref("ROOMS").child(currentRoom).on("child_added", (snapshot) => {

    var sen = snapshot.val().sender;
    var tim = snapshot.val().time;
    var msg = snapshot.val().message;

    let genTxt = createRecieve(sen, msg, tim);
    console.log(genTxt);
    document.getElementById("chatbox").innerHTML += genTxt;
});



function createRecieve(user, msg, time) {
    var generatedMsg = `<li class="chat incoming"><p class="sender">${user}</p><p class="msg">${msg}</p><p class="time">${time}</p></li>`
    return generatedMsg;
}


