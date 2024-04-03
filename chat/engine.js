// CONFIG 

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

// VAR INITIALIZATION

var currentRoom;
var currentActive = 0;
var activeUpdate = false;
var currentUser;

// CHECK THE URL HREF

var currurl = window.location.href;
if (currurl.includes("?r=")) {
    spliced = currurl.split("?r=");
    codie = spliced[1];
    console.log(codie)
    if (codie == undefined) {
        window.location.href = "index.html"
    }
    else {
        if (codie.length == 6) {
            var currSender = localStorage.getItem("chatName");
            if (!currSender) {
                currSender = prompt("Enter Your Name")
                if (!currSender) {
                    window.location.href = "index.html"
                }

                localStorage.setItem("chatName", currSender);
            }
            currentRoom = codie;
            let rmcodeElement = document.getElementById("rmcode")
            rmcodeElement.innerText = "Roomcode: " + currentRoom;
            document.getElementById("welPop").style.display = "none";
        }
    }

}

// NAME CHECK

var localName = localStorage.getItem("chatName");
if (localName != null) {
    document.getElementById("name").value = localName;
}

// GET TIME 

function geTime() {
    const now = new Date();
    times = `${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${(now.getMinutes() / 10 < 1) ? "0" + now.getMinutes() : now.getMinutes()}${now.getHours() > 12 ? "PM" : "AM"}`;
    return times
}

// SEND MSG INVOKING

document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage()
    }
});

// DELETE ROOM

function deleteRoom() {
    firebase.database().ref("ROOMS").child(currentRoom).remove();
    window.location.href = "/"
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
    document.execCommand("copy");
}

function closeRoomPop() {
    const thEl = document.getElementById('exportroompop');
    thEl.style.display = "None";
}


// CODE GENERATIOR

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
    var tempName = document.getElementById("name").value;
    let spaceCheck = !tempName.replace(/\s/g, '').length;
    if (spaceCheck) {
        alert("Valid Name Only!");
    } else {
        currentUser = tempName;
        currentRoom = codeGenerator();
        window.location.href += `?r=${currentRoom}`
        firebase.database().ref("ROOMS").child(currentRoom).set({
            "active": 1

        })
        document.getElementById("welPop").style.display = "none";
    }
}

function joinRoom() {
    var tempName = document.getElementById("name").value;
    let spaceCheck = !tempName.replace(/\s/g, '').length;
    if (spaceCheck) {
        alert("Valid Name Only!");
    } else {
        currentUser = tempName;
        var jrCode = document.getElementById("roomcode").value.toUpperCase();
        currentRoom = jrCode;
        document.getElementById("welPop").style.display = "none";
    }
}

//SEND MESSAGE

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

//CHECK INCOMING 

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
    }
});

// firebase.database().ref("ROOMS").child(currentRoom).child("active").once("value", function (snapshot) {
//     currentActive = parseInt(snapshot.val());
//     console.log(currentActive)
// });