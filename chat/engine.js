

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




var currentRoom;
var currSender = localStorage.getItem("chatName");
if (!currSender) {
    currSender = prompt("Enter Your Name")
    if (!currSender) {
        window.location.href = "index.html"
    }
    localStorage.setItem("chatName", currSender);
}
const p = (msg) => { console.log(msg) }
function chatLoad() {
    // currentRoom = codeGenerator();
    currurl = window.location.href;
    spliced = currurl.split("?r=");
    codie = spliced[1];
    console.log(codie)
    if (codie == undefined) {
        window.location.href = "index.html"
    }
    else {
        if (codie.length == 6) {
            currentRoom = codie;
            let rmcodeElement = document.getElementById("rmcode")
            rmcodeElement.innerText = "Roomcode: " + currentRoom;
        }
    }


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
});






function createRecieve(user, msg, time) {
    if (user == currSender) {
        const liEl = document.createElement("li");
        liEl.classList.add("chat", "outgoing");
        const senP = document.createElement("p");
        senP.className = "sender";
        senP.innerText = user;
        const msgP = document.createElement("p");
        msgP.className = "msg";
        msgP.innerText = msg;
        const timP = document.createElement("p");
        timP.className = "time";
        timP.innerText = time;
        liEl.appendChild(senP);
        liEl.appendChild(msgP);
        liEl.appendChild(timP);
    } else {
        const liEl = document.createElement("li");
        liEl.classList.add("chat", "outgoing");
        const senP = document.createElement("p");
        senP.className = "sender";
        senP.innerText = user;
        const msgP = document.createElement("p");
        msgP.className = "msg";
        msgP.innerText = msg;
        const timP = document.createElement("p");
        timP.className = "time";
        timP.innerText = time;
        liEl.appendChild(senP);
        liEl.appendChild(msgP);
        liEl.appendChild(timP);

    }
    return liEl;
}

console.log("check")
chatLoad()
firebase.database().ref("ROOMS").child(currentRoom).on("child_added", (snapshot) => {
    const msgScr = document.getElementById("chatbox");

    var user = snapshot.val().sender;
    var time = snapshot.val().time;
    var msg = snapshot.val().message;
    if (user == currSender) {
        const liEl = document.createElement("li");
        liEl.classList.add("chat", "outgoing");
        const senP = document.createElement("p");
        senP.className = "sender";
        senP.innerText = user;
        const msgP = document.createElement("p");
        msgP.className = "msg";
        msgP.innerText = msg;
        const timP = document.createElement("p");
        timP.className = "time";
        timP.innerText = time;
        liEl.appendChild(senP);
        liEl.appendChild(msgP);
        liEl.appendChild(timP);
        msgScr.appendChild(liEl);

    } else {
        const liEl = document.createElement("li");
        liEl.classList.add("chat", "outgoing");
        const senP = document.createElement("p");
        senP.className = "sender";
        senP.innerText = user;
        const msgP = document.createElement("p");
        msgP.className = "msg";
        msgP.innerText = msg;
        const timP = document.createElement("p");
        timP.className = "time";
        timP.innerText = time;
        liEl.appendChild(senP);
        liEl.appendChild(msgP);
        liEl.appendChild(timP);
        msgScr.appendChild(liEl);

    }
    msgScr.scrollTop = msgScr.scrollHeight;

});


function deleteRoom() {
    firebase.database().ref("ROOMS").child(currentRoom).remove();
    window.location.href = "/"

}



function shareRoom() {

    const theUrl = `https:\/\/rith1x.github.io/chat/chat.html?r=${currentRoom}`;
    const qrBase = "https:\/\/chart.googleapis.com/chart?cht=qr&chs=512x512&chl=";
    const masterQr = qrBase + theUrl;
    sharePop(masterQr, theUrl);

}


function sharePop(qrsrc, txtsrc) {
    const tHEl = document.getElementById('exportroompop');
    tHEl.style.display = "flex";
    tHEl.style.animationPlayState = "running";
    const imgel = document.getElementById('qrimg');
    imgel.src = qrsrc;
    const loader = document.getElementById('loading-bar-spinner');

    loader.style.display = "none";

    imgel.style.display = "block";
    const urlBox = document.getElementById('shareurl');
    urlBox.value = txtsrc



}

function clipboardcopy() {
    const pwElement = document.getElementById("shareurl");
    pwElement.select();
    document.execCommand("copy");


}

function closeRoomPop() {
    const thEl = document.getElementById('exportroompop');
    thEl.style.display = "None";

}