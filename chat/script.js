
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
let namePush = false;

const mex = document.getElementById("mex");

const wscr = document.getElementById("welcx");
const cscr = document.getElementById("chatx");
let updat;


var currurl = window.location.href;
console.log(currurl)
if (currurl.includes("?r=")) {
    let spliced = currurl.split("?r=");
    let codie = spliced[1];
    let frontpt = spliced[0]
    let namey = localStorage.getItem("chatName")
    if (frontpt.includes("?c")) {
        let dat = [namey];
        console.log(dat)
        firebase.database().ref("ROOMS").child(codie).child("active").set(dat);
    }
    console.log(codie)
    document.getElementById("roomcode").value = codie;
    if (codie != undefined) {
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

        } else {
            window.location.href = frontpt;
        }
    }

}
if (!namePush && currentRoom) {
    firebase.database().ref("ROOMS").child(currentRoom).child("active").on("value", function (snapshot) {
        updat = snapshot.val();
        console.log(updat);
        if (updat != undefined) {
            if (updat.includes(currSender)) {
                namePush = true
            }
            if (!namePush) {
                namePush = true
                updat.push(currentUser);
                console.log(updat)
                firebase.database().ref("ROOMS").child(currentRoom).child("active").set(updat);
            }
            updateActiveBar();
        }
    })
}
function leaveRoom() {
    firebase.database().ref("ROOMS").child(currentRoom).child("active").on("value", function (snapshot) {
        updat = snapshot.val();
        console.log(updat);
        if (updat != undefined) {
            updat.pop(currentUser);
            console.log(updat)
            firebase.database().ref("ROOMS").child(currentRoom).child("active").set(updat);
            updateActiveBar();
        }
    })
    currentRoom = "";
    window.location.href = "../chat/"



}
function updateActiveBar() {
    const parAct = document.getElementById("actives");
    parAct.innerHTML = "";
    updat.forEach(el => {
        const personn = document.createElement('div');
        const pername = document.createElement('p');
        pername.innerText = el;
        personn.appendChild(pername);
        parAct.appendChild(personn);
        parAct.scrollLeft = parAct.scrollWidth;


    });
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
        })
        .catch(error => {

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
        window.location.href += `?c?r=${currentRoom}`
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
    // console.log(uncleaned);
    var message = profanityCleaner(uncleaned);
    if (message != " " || message != "") {
        timex = geTime();
        firebase.database().ref("ROOMS").child(currentRoom).push().set({
            "sender": currSender,
            "message": message,
            "time": timex
        })
            .then(() => {
                // console.log("Message sent successfully");
            })
            .catch((error) => {
                // console.error("Error sending message:", error);
            });
    }
    messageel.value = "";
    messageel.focus();
}

function playTone() {
    const toner = document.getElementById("toner");
    toner.play();
    // console.log("Tone Play")
}


function showNoti(sender, room) {
    if (!("Notification" in window)) {
        // console.error("This browser does not support desktop notification");
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(function (permission) {
            if (permission !== "granted") {
                // console.warn("Permission denied for notifications");
            }
        });
    }

    const title = `Chatie - ${room}`;
    const body = `${sender} sent you a message!`;
    const notification = new Notification(title, {
        body: body,
    });
    notification.show();
}


function deleteMsg(e, idxx, msg) {

    var permis = window.confirm(`Do you want to delete the message "${msg}"?`);
    if (permis) {
        if (msg != "Deleted Message") {
            firebase.database().ref("ROOMS").child(currentRoom).child(idxx).child("message").set("Deleted Message")
        }
    }

}
function showAlert(title, content) {
    document.getElementById("alertbox").style.display = "block"
    document.getElementById("aTitle").innerText = title;
    document.getElementById("aDefn").innerText = content;
}
function closeAlert() {
    document.getElementById("alertbox").style.display = "none"
}
function acceptAlert() {


    closeAlert();
}
function declineAlert() {
    closeAlert();
}

function listMessages(snapshot) {
    if (snapshot.val().sender != undefined) {
        const msgScr = document.getElementById("chatbox");
        var user = snapshot.val().sender;
        var time = snapshot.val().time;
        var msg = snapshot.val().message;
        var muid = snapshot.key;
        // console.log(snapshot.key)

        if (user == currSender) {
            const liEl = document.createElement("li");
            liEl.classList.add("chat", "outgoing");
            liEl.id = snapshot.key
            liEl.onclick = (ev) => { replyingTo(ev, snapshot.key) }
            const senP = document.createElement("p");
            senP.className = "sender";
            senP.innerText = user;
            const topBar = document.createElement("div");
            topBar.className = "top-bar";
            const msgP = document.createElement("p");
            msgP.className = "msg";
            msgP.id = "p" + snapshot.key;

            if (msg != "Deleted Message") {
                liEl.oncontextmenu = (el) => { deleteMsg(el, muid, msg) };
                msgP.innerText = msg;
            } else {
                msgP.innerHTML = "<i>Deleted Message</i>"
                msgP.style.color = "#959595"
            }
            const timP = document.createElement("p");
            timP.className = "time";
            timP.innerText = time;
            topBar.appendChild(senP);
            topBar.appendChild(timP);
            liEl.appendChild(topBar);
            liEl.appendChild(msgP);
            // console.log(muid)
            msgScr.appendChild(liEl);

        } else {
            const liEl = document.createElement("li");
            liEl.classList.add("chat", "incoming");
            liEl.id = snapshot.key;
            const senP = document.createElement("p");
            senP.className = "sender";
            senP.innerText = user;
            const topBar = document.createElement("div");
            topBar.className = "top-bar";
            const msgP = document.createElement("p");
            msgP.className = "msg";
            msgP.id = "p" + snapshot.key;
            if (msg != "Deleted Message") {
                msgP.innerText = msg;
            } else {
                msgP.innerHTML = "<i>Deleted Message</i>"
                msgP.style.color = "#959595"
            }
            const timP = document.createElement("p");
            timP.className = "time";
            timP.innerText = time;
            topBar.appendChild(senP);
            topBar.appendChild(timP);
            liEl.appendChild(topBar);
            liEl.appendChild(msgP);
            msgScr.appendChild(liEl);
            // console.log("new ")
            if (syncer) {
                playTone();
                showNoti(user, currentRoom);
            }
            syncer = true
        }
        msgScr.scrollTop = msgScr.scrollHeight;
    }
}



if (currentRoom) {
    firebase.database().ref("ROOMS").child(currentRoom).on("child_added", (snapshot) => {
        listMessages(snapshot);
    });
    firebase.database().ref("ROOMS").child(currentRoom).on("child_changed", (snapshot) => {
        document.getElementById("p" + snapshot.key).innerHTML = '<i>Deleted Message</i>'
        document.getElementById("p" + snapshot.key).style.color = '#959595'
    });
}



let lastTapTime = 0;
let tappedElement = null;
function replyingTo(event, key) {
    const currentTime = new Date().getTime();
    const tapDelay = 300; // Adjust this value as needed (in milliseconds)

    if (tappedElement === event.target && (currentTime - lastTapTime) < tapDelay) {
        console.log("Double tap detected on:", event.target);
        lastTapTime = 0;
        tappedElement = null;
    } else {
        lastTapTime = currentTime;
        tappedElement = event.target;
    }
    console.log(key)
}