
const firebaseConfig = {
    apiKey: "AIzaSyD6KJ-ZZGsThD1aAxSpaZHsuPMmG-dvYqE",
    authDomain: "chatx-29ff8.firebaseapp.com",
    projectId: "chatx-29ff8",
    databaseURL: "https://chatx-29ff8-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "chatx-29ff8.appspot.com",
    messagingSenderId: "1007710976666",
    appId: "1:1007710976666:web:71c3895500b964d816fd23"
};
firebase.initializeApp(firebaseConfig);

var currentRoom;
var currentUser;

const mex = document.getElementById("mex");

const wscr = document.getElementById("welcx");
const cscr = document.getElementById("chatx");


var currurl = window.location.href;
console.log(currurl)
if (currurl.includes("?r=")) {
    let spliced = currurl.split("?r=");
    let codie = spliced[1];

    console.log(codie)
    document.getElementById("roomcode").value = codie;
    if (codie == undefined) {

    }
    else {
        if (codie.length == 6) {
            var currSender = localStorage.getItem("chatName");
            if (!currSender) {
                currSender = prompt("Enter Your Name")
                if (currSender) {
                    wscr.style.display = "none";
                    localStorage.setItem("chatName", currSender);
                    document.getElementById("name").value = currSender;
                    currentRoom = codie.toUpperCase();
                    console.log(currentRoom);
                    let rmcodeElement = document.getElementById("rmcode")
                    rmcodeElement.innerText = "Roomcode: " + currentRoom;

                }

            } else {
                wscr.style.display = "none";

                localStorage.setItem("chatName", currSender);
                document.getElementById("name").value = currSender;
                currentRoom = codie.toUpperCase();

                let rmcodeElement = document.getElementById("rmcode")
                rmcodeElement.innerText = "Roomcode: " + currentRoom;
            }
        }
    }

}

function checkName() {
    const nameEl = document.getElementById("name");
    var loName = localStorage.getItem("chatName");
    if (loName == null || loName == undefined || loName == "null" || loName == 'null') {
        nameEl.style.border = "solid 2px #f00";
    } else {
        currentUser = loName;
        nameEl.value = loName;
    }
}
checkName();

function nameValidate() {
    const nameEl = document.getElementById("name");
    var tempName = nameEl.value;
    let spaceCheck = !tempName.replace(/\s/g, '').length;
    if (spaceCheck || nameEl == null || nameEl == 'null' || nameEl == undefined) {
        alert("Enter Valid Name!");
        return false;
    }
    localStorage.setItem("chatName", tempName);
    currentUser = tempName;
    return true;
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

function deleteRoom() {
    firebase.database().ref("ROOMS").child(currentRoom).remove();
    window.location.href = "../chat/"
}

//SHARE ROOM

function shareRoom() {
    const theUrl = `https:\/\/rith1x.github.io/chat/?r=${currentRoom}`;
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

//COPY FN

function clipboardcopy() {
    const pwElement = document.getElementById("shareurl");
    pwElement.select();
    document.clipboardcopy("copy");
}

function closeRoomPop() {
    const thEl = document.getElementById('exportroompop');
    thEl.style.display = "None";
}


function codeGenerator() {
    let vals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let code = "";
    while (code.length != 6) {
        code += vals[Math.floor(Math.random() * vals.length)];
    }
    return code;
}

// CREATE OR JOIN ROOM

function createRoom() {
    let vali = nameValidate();
    if (vali) {
        currentRoom = codeGenerator();
        window.location.href += `?r=${currentRoom}`
    }
}

function joinRoom() {
    let vali = nameValidate();
    if (vali) {
        currentRoom = codeGenerator();
        var jrCode = document.getElementById("roomcode").value.toUpperCase();
        window.location.href += `?r=${jrCode}`
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
    messageel.value = "";
    messageel.focus();
}

//CHECK INCOMING 

if (currentRoom) {
    firebase.database().ref("ROOMS").child(currentRoom).on("child_added", (snapshot) => {
        if (snapshot.val().sender != undefined) {
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
                const topBar = document.createElement("div");
                topBar.className = "top-bar";
                const msgP = document.createElement("p");
                msgP.className = "msg";
                msgP.innerText = msg;
                const timP = document.createElement("p");
                timP.className = "time";
                timP.innerText = time;
                topBar.appendChild(senP);
                topBar.appendChild(timP);
                liEl.appendChild(topBar);
                liEl.appendChild(msgP);
                msgScr.appendChild(liEl);
            } else {
                const liEl = document.createElement("li");
                liEl.classList.add("chat", "incoming");
                const senP = document.createElement("p");
                senP.className = "sender";
                senP.innerText = user;
                const topBar = document.createElement("div");
                topBar.className = "top-bar";
                const msgP = document.createElement("p");
                msgP.className = "msg";
                msgP.innerText = msg;
                const timP = document.createElement("p");
                timP.className = "time";
                timP.innerText = time;
                topBar.appendChild(senP);
                topBar.appendChild(timP);
                liEl.appendChild(topBar);
                liEl.appendChild(msgP);
                msgScr.appendChild(liEl);
            }
            msgScr.scrollTop = msgScr.scrollHeight;
        }
    });

}
// firebase.database().ref("ROOMS").child(currentRoom).child("active").once("value", function (snapshot) {
//     currentActive = parseInt(snapshot.val());
//     console.log(currentActive)
// });


