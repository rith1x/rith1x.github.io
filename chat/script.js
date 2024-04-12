
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
var syncer = false;

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
const p = (c) => { console.log(c) }
var profDb = [];
function profanityFetch() {
    const binId = '66123526e41b4d34e4e08701';
    const accessKey = '$2a$10$odq91M7aOecbPFdaJheXrO0SZ8jooZN4xTsyUmhU4fRkbkNob8oci';
    fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: {
            'X-Access-Key': accessKey
        }
    })
        .then(response => response.json())
        .then(data => {
            profDb = data.record.profanity
            console.log("Database Filter Fetched!")
        })
        .catch(error => {
            console.error('Error:', error);

        });
}




profanityFetch()





function geTime() {
    const now = new Date();
    times = `${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${(now.getMinutes() / 10 < 1) ? "0" + now.getMinutes() : now.getMinutes()}${now.getHours() > 12 ? "PM" : "AM"}`;
    return times
}

document.addEventListener("keyup", (e) => {
    const leb = document.getElementById("message").value
    if (e.key === "Enter" && leb != "") {
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

function profanityCleaner(sentence) {
    var result = [];
    const localWords = sentence.split(" ");
    for (i = 0; i < localWords.length; i++) {
        if (profDb.includes(localWords[i].toLowerCase())) {
            localWords[i] = "****"
        }
        result.push(localWords[i]);
    }
    result = result.join(" ");
    return result;

}

function sendMessage() {
    var messageel = document.getElementById("message");
    var uncleaned = messageel.value;
    console.log(uncleaned);
    var message = profanityCleaner(uncleaned);
    p(uncleaned)
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

function playTone(){
    const tone = new Audio("tone.mp3");
    tone.play();
}

function showNoti(sender,room){
    const title = `Chatie - ${room}`;
const body = `${sender} sent you a message!`;
const notification = new Notification(title, {
  body: body,
});
notification.show();
}




//CHECK INCOMING 

if (currentRoom && syncer) {
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
                playTone();
                showNoti(user,currentRoom);
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

} else {
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
        syncer = true;
    });
}



