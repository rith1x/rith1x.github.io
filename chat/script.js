var chat_media = 0;

firebase.initializeApp(firebaseConfig);
const db = firebase.database()
var currentRoom;
var currentUser;
var syncer = false;
let namePush = false;

const mex = document.getElementById("mex");

const wscr = document.getElementById("welcx");
const cscr = document.getElementById("chatx");
let updat;

const lklk = {
    en: (_ms, _ky) => { return CryptoJS.AES.encrypt(_ms, _ky).toString(); },
    de: (_ms, _ky) => { return CryptoJS.AES.decrypt(_ms, _ky).toString(CryptoJS.enc.Utf8); }
};

document.addEventListener('DOMContentLoaded', connectRoom())

async function connectRoom() {
    var currurl = window.location.href;
    console.log(currurl)
    if (currurl.includes("?r=")) {
        let spliced = currurl.split("?r=");
        let codie = spliced[1];
        let frontpt = spliced[0]
        // let namey = localStorage.getItem("chatName")
        // let dat = [namey];
        // console.log(dat)
        // db.ref("ROOMS").child(codie).child("active").set(dat);
        console.log(codie)
        document.getElementById("roomcode").value = codie;
        if (codie != undefined) {
            let flag = await checkPresence()
            console.log(flag)
            if (!flag) {
                window.alert("Room doesn't exists")
            }
            if (codie.length == 6 && flag) {


                var currSender = localStorage.getItem("chatName");
                if (!currSender) {
                    currSender = prompt("Enter Your Name")
                    if (currSender) {
                        wscr.style.display = "none";
                        localStorage.setItem("chatName", currSender);
                        document.getElementById("name").value = currSender;
                        currentRoom = codie.toUpperCase();
                        console.log(currentRoom);
                        let rmcodeElement = document.getElementById("rc")
                        rmcodeElement.innerText = currentRoom;

                    }

                } else {
                    wscr.style.display = "none";

                    localStorage.setItem("chatName", currSender);
                    document.getElementById("name").value = currSender;
                    currentRoom = codie.toUpperCase();

                    let rmcodeElement = document.getElementById("rc")
                    rmcodeElement.innerText = currentRoom;
                }

            } else {
                window.location.href = frontpt;
            }
        }

    }
}





if (!namePush && currentRoom) {
    db.ref("ROOMS").child(currentRoom).child("active").on("value", function (snapshot) {
        updat = snapshot.val();
        // console.log(updat);
        if (updat != undefined) {
            if (updat.includes(currSender)) {
                namePush = true
            }
            if (!namePush) {
                namePush = true
                updat.push(currentUser);
                console.log(updat)
                db.ref("ROOMS").child(currentRoom).child("active").set(updat);
            }
            updateActiveBar();
        }
    })
}
async function checkPresence(code) {
    const actRef = db.ref('METADATA/activeRooms')
    actRef.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const arr = snapshot.val()
                console.log(arr)
                if (arr.includes(code)) return true
                else return false

            } else {
                return false
            }
        }).catch((err) => {
            console.error(err)
        })
}
function leaveRoom() {
    db.ref("ROOMS").child(currentRoom).child("active").on("value", function (snapshot) {
        updat = snapshot.val();
        console.log(updat);
        if (updat != undefined) {
            updat.pop(currentUser);
            console.log(updat)
            db.ref("ROOMS").child(currentRoom).child("active").set(updat);
            updateActiveBar();
        }
    })
    currentRoom = "";
    window.location.href = "../chat/"



}
function updateActiveBar() {
    const parAct = document.getElementById("members");
    parAct.innerHTML = "";
    updat.forEach(el => {
        const pername = document.createElement('span');
        pername.innerText = el;
        parAct.appendChild(pername);
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




// profanityFetch()





function geTime() {
    const now = new Date();
    times = `${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${(now.getMinutes() / 10 < 1) ? "0" + now.getMinutes() : now.getMinutes()}${now.getHours() > 12 ? "PM" : "AM"}`;
    return times
}

document.addEventListener("keyup", (e) => {
    const leb = document.getElementById("message").value
    if (!e.shiftKey && e.key === "Enter" && leb != "") {
        sendMessage()
    }
});

function deleteRoom() {
    db.ref("ROOMS").child(currentRoom).remove();
    if (chat_media != 0) {
        var storage = firebase.storage();
        var storageRef = storage.ref();
        storageRef.child('data').child(currentRoom).deleteWithCompletion().then(() => {
            alert("Chats and media were cleared from the cloud")
            window.location.href = "../chat/"
        }).error((er) => { console.log(er); })
    } else {
        window.location.href = "../chat/"

    }
}

//SHARE ROOM

function shareRoom() {
    const theUrl = `https://rith1x.github.io/chat/?r=${currentRoom}`;
    const qrBase = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=";
    const masterQr = qrBase + theUrl;
    showOptions()
    sharePop(masterQr, theUrl);

}

function sharePop(qrsrc, txtsrc) {
    const tHEl = document.getElementById('exportroompop');
    tHEl.style.display = "flex";
    tHEl.style.animationPlayState = "running";
    const imgel = document.getElementById('qrimg');
    imgel.src = qrsrc;
    imgel.style.display = "block";
    const urlBox = document.getElementById('shareurl');
    urlBox.value = txtsrc
}

//COPY FN

function clipboardcopy() {
    const pwElement = document.getElementById("shareurl");
    let link2cpy = pwElement.value;
    navigator.clipboard.writeText(link2cpy);
    document.getElementById('cpyBtn').value = "Copied!";
    setTimeout(() => {
        document.getElementById('cpyBtn').value = "Copy";


    }, 2000);
    // document.execCommand("copy");
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

async function createRoom() {
    let vali = nameValidate();
    if (vali) {
        currentRoom = codeGenerator();
        await activateRoom(currentRoom)
        window.location.href += `?r=${currentRoom}`
    }
}



function joinRoom() {
    let vali = nameValidate();
    if (vali) {
        // currentRoom = codeGenerator();
        var jrCode = document.getElementById("roomcode").value.toUpperCase();
        window.location.href += `?r=${jrCode}`
    }
}

function profanityCleaner(sentence) {
    // var result = [];
    // const localWords = sentence.split(" ");
    // for (i = 0; i < localWords.length; i++) {
    //     if (profDb.includes(localWords[i].toLowerCase())) {
    //         localWords[i] = "****"
    //     }
    //     result.push(localWords[i]);
    // }
    // result = result.join(" ");
    let key = keyMaker(currentRoom);
    console.log(key)
    let encrypted = lklk.en(sentence, `k${key}`);
    return encrypted;

}

function normalMessage() {
    console.log("Normal Type")
    var messageel = document.getElementById("message");
    var uncleaned = messageel.value;
    // console.log(uncleaned);

    var message = profanityCleaner(uncleaned);
    message = message.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    if (message != " " || message != "") {
        var timex = geTime();
        db.ref("ROOMS").child(currentRoom).push().set({
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
    notification.show;
}


function deleteMsg(e, idxx, msg) {
    let content = profanityCleaner("Deleted Message")
    var permis = window.confirm(`Do you want to delete the message "${msg}"?`);
    if (permis) {
        db.ref("ROOMS").child(currentRoom).child(idxx).child("message").set(content)
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
        var listy = Array(Object.keys(snapshot.val()))
        console.log(listy)
        var iUrl;
        var msg = snapshot.val().message;
        if (msg) {
            msg = lklk.de(msg, `k${keyMaker(currentRoom)}`)
        } else {
            iUrl = snapshot.val().imgUrl
        }

        if (msg == '') {
            msg = "<DECRYPTION TOKEN FAILURE>"
        }
        var muid = snapshot.key;
        // console.log(snapshot.key)
        const liEl = document.createElement("li");
        if (user == currSender) {
            liEl.classList.add("chat", "outgoing");
            liEl.id = snapshot.key
            // liEl.onclick = (ev) => { replyingTo(ev, snapshot.key) }
            const senP = document.createElement("p");
            senP.className = "sender";
            senP.innerText = user;
            senP.id = "s" + snapshot.key;
            const topBar = document.createElement("div");
            topBar.className = "top-bar";
            if (msg) {

                const msgP = document.createElement("p");
                msgP.className = "msg";
                msgP.id = "p" + snapshot.key;

                if (msg != "Deleted Message") {
                    // liEl.oncontextmenu = (el) => { deleteMsg(el, muid, msg) };
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
            } else {
                const msgP = document.createElement('img');
                chat_media = 1;
                msgP.className = "mediaImg";
                msgP.id = "m" + snapshot.key;
                msgP.src = iUrl;
                const timP = document.createElement("p");
                timP.className = "time";
                timP.innerText = time;
                topBar.appendChild(senP);
                topBar.appendChild(timP);
                liEl.appendChild(topBar);
                liEl.appendChild(msgP);
            }
            // console.log(muid)

        }



        else {
            liEl.classList.add("chat", "incoming");
            liEl.id = snapshot.key;
            // liEl.onclick = (ev) => { replyingTo(ev, snapshot.key) }

            const senP = document.createElement("p");
            senP.className = "sender";
            senP.innerText = user;
            senP.id = "s" + snapshot.key;

            const topBar = document.createElement("div");
            topBar.className = "top-bar";
            // const msgP = document.createElement("p");
            // msgP.className = "msg";
            // msgP.id = "p" + snapshot.key;
            // msgP.id = "p" + snapshot.key;

            // if (msg != "Deleted Message") {
            //     msgP.innerText = msg;
            // } else {
            //     msgP.innerHTML = "<i>Deleted Message</i>"
            //     msgP.style.color = "#959595"
            // }
            // const timP = document.createElement("p");
            // timP.className = "time";
            // timP.innerText = time;
            // topBar.appendChild(senP);
            // topBar.appendChild(timP);
            // liEl.appendChild(topBar);
            // liEl.appendChild(msgP);
            // // console.log("new ")
            if (msg) {

                const msgP = document.createElement("p");
                msgP.className = "msg";
                msgP.id = "p" + snapshot.key;

                if (msg != "Deleted Message") {
                    // liEl.oncontextmenu = (el) => { deleteMsg(el, muid, msg) };
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
            } else {
                const msgP = document.createElement('img');
                msgP.className = "mediaImg";
                msgP.id = "m" + snapshot.key;
                msgP.src = iUrl;
                const timP = document.createElement("p");
                timP.className = "time";
                timP.innerText = time;
                topBar.appendChild(senP);
                topBar.appendChild(timP);
                liEl.appendChild(topBar);
                liEl.appendChild(msgP);
            }
            if (syncer) {
                playTone();
                showNoti(user, currentRoom);
            }
            syncer = true
        }


        var reVe = snapshot.val().rId;
        // console.log(reVe)


        if (reVe) {
            liEl.classList.add("repLos")
            const liElx = document.createElement("li");
            liElx.className = "chat";
            const repP = document.createElement("li");
            repP.className = "replyEnc"
            const repSender = db.ref("ROOMS").child(currentRoom).child(reVe);
            repSender.once('value').then(snapshot => {
                const rSen = snapshot.val().sender
                const rMsg = snapshot.val().message
                const senP = document.createElement("p");
                senP.className = "sender";
                senP.innerText = rSen;
                const topBar = document.createElement("div");
                topBar.className = "top-bar";
                const msgP = document.createElement("p");
                msgP.className = "msg";
                msgP.id = "p" + snapshot.key;
                if (msg != "Deleted Message") {
                    msgP.innerText = rMsg;
                } else {
                    msgP.innerHTML = "<i>Deleted Message</i>"
                    msgP.style.color = "#959595"
                }
                topBar.appendChild(senP);
                console.log(liEl)

                liElx.appendChild(topBar);
                liElx.appendChild(msgP);
                liEl.appendChild(liElx)
                repP.appendChild(liEl)
                msgScr.appendChild(repP);

            })
            msgScr.scrollTop = msgScr.scrollHeight;

        } else {
            msgScr.appendChild(liEl);
        }
        msgScr.scrollTop = msgScr.scrollHeight;
    }
}
if (currentRoom) {
    db.ref("ROOMS").child(currentRoom).on("child_added", (snapshot) => {
        listMessages(snapshot);
        const msgScr = document.getElementById("chatbox");
        msgScr.scrollTop = msgScr.scrollHeight;

    });
    db.ref("ROOMS").child(currentRoom).on("child_changed", (snapshot) => {
        document.getElementById("p" + snapshot.key).innerHTML = '<i>Deleted Message</i>'
        document.getElementById("p" + snapshot.key).style.color = '#959595'
    });
}
var sendMessage = () => { normalMessage() }
var cRply;
function replyingTo(event, key) {
    console.log(key, event)
    const rMsg = document.getElementById("p" + key).innerText;
    const rSen = document.getElementById("s" + key).innerText;
    console.log(rSen)
    console.log(rMsg)
    const replyStage = document.getElementById("replyArea");
    var rTemp = `
    <p class="repTo">
                            Replying to
                        </p>
                        <div class="rCon">

                            <div class="rLeft">
                                <h3>${rSen}</h3>
                                <p>${rMsg}</p>
                            </div>
                            <div class="rRight">
                                <button onclick=cancelReply()>
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>`
    replyStage.innerHTML = rTemp
    cRply = key;
    sendMessage = () => replyMessage();
    var messageel = document.getElementById("message");
    messageel.focus();
}
function cancelReply() {
    document.getElementById("replyArea").innerHTML = "";
}

function replyMessage() {
    document.getElementById("replyArea").innerHTML = "";
    console.log("replying")
    var messageel = document.getElementById("message");
    var uncleaned = messageel.value;
    var message = profanityCleaner(uncleaned);
    message = message.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

    if (message != " " || message != "") {
        var timex = geTime();
        var rems = cRply;
        db.ref("ROOMS").child(currentRoom).push().set({
            "sender": currSender,
            "message": message,
            "time": timex,
            "rId": rems,
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
    cRply = "";
    sendMessage = () => normalMessage();
}


db.ref("ROOMS").on("child_removed", (snapshot) => {
    console.log(snapshot.key);
    if (currentRoom == snapshot.key) {
        currentRoom = "";
        window.location.href = "/chat";
    }
});


function afterUpload(list) {
    console.log(list)
    const replyStage = document.getElementById("replyArea");
    replyStage.innerHTML = ""
    var rTemp = `
    <p class="repTo">
                            Share Image
                        </p>
                        <div class="rCon">
                        <div class="rLeft">
                        <img style="width:300px" src="${list[0]}" />
                        
                        </div>                            
                            
                            <div class="rRight">
                                <button onclick=cancelReply()>
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>`
    replyStage.innerHTML = rTemp;
    document.getElementById("mediaStage").value = list[0];
    var messageel = document.getElementById("message");
    messageel.value = " ";
}


function sendMedia() {
    chat_media = 1;
    document.getElementById("replyArea").innerHTML = "";
    console.log("Media")
    var timex = geTime();
    let rems = document.getElementById("mediaStage").value;

    db.ref("ROOMS").child(currentRoom).push().set({
        "sender": currSender,
        "time": timex,
        "imgUrl": rems,
    })
        .then(() => {
            // console.log("Message sent successfully");
        })
        .catch((error) => {
            // console.error("Error sending message:", error);
        });
    document.getElementById("mediaStage").value = "";

    sendMessage = () => normalMessage();
}

function keyMaker(rc) {
    let nc = ""
    let rs = "";
    for (let i = 0; i < rc.length; i++) {
        nc += parseInt(rc.charCodeAt(i)) + 1
    }
    for (let i = nc.length - 1; i >= 0; i--) {
        rs += nc[i]
    }
    return parseInt(rs) + parseInt(nc)
}
async function uploadImg() {
    var file = document.getElementById("imgFile").files;
    var files = Array.from(file);
    var storage = firebase.storage();
    var storageRef = storage.ref();

    try {
        const uploadPromises = files.map((img, index) => {
            return new Promise((resolve, reject) => {
                var thisref = storageRef.child('data').child(currentRoom).child("images").child(`img${index}`).put(img);
                thisref.on(
                    "state_changed",
                    function (snapshot) {
                        console.log(snapshot);
                    },
                    function (error) {
                        reject(error);
                    },
                    async function () {
                        const downloadURL = await thisref.snapshot.ref.getDownloadURL();
                        resolve(downloadURL);
                    }
                );
            });
        });

        const imgUrls = await Promise.all(uploadPromises);
        sendMessage = () => sendMedia();

        afterUpload(imgUrls) // Access the first image URL

    } catch (error) {
        console.error('Error uploading images:', error);
    }
}

let menu = 0;
function showOptions() {
    if (menu == 0) {
        document.getElementById('ropt').style.transform = "translatex(0)"
        document.getElementById('ropt').style.opacity = 1
        menu = 1
    } else {
        document.getElementById('ropt').style.transform = "translatex(100%)"
        document.getElementById('ropt').style.opacity = 0
        menu = 0

    }
}

document.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Prevent default right-click menu




    let par = event.target;
    if (!par.classList.contains('chatbox')) {
        while (!(par.classList.contains('chat'))) {
            par = par.parentElement
        }
    }
    if (par.classList.contains('outgoing')) {
        console.log("sent")
        document.getElementById('op3').style.display = "block"
        let ms = document.getElementById('p' + par.id).innerText
        document.getElementById('op3').onclick = (el) => { deleteMsg(el, par.id, ms) }
        document.getElementById('op2').onclick = (e) => { replyingTo(e, par.id) }
        document.getElementById('op1').onclick = (e) => { copyMessage(e, par.id) }
    } else if (par.classList.contains('incoming')) {
        console.log("recieves")
        document.getElementById('op3').style.display = "none"
        document.getElementById('op2').onclick = (e) => { replyingTo(e, par.id) }
        document.getElementById('op1').onclick = (e) => { copyMessage(e, par.id) }
    } else {
        console.log("invalid")
        return;
    }
    console.log(par.classList)

    const contextMenu = document.getElementById("contextMenu");
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    let mouseX = event.pageX;
    let mouseY = event.pageY;

    if (mouseX + menuWidth > pageWidth) {
        mouseX -= menuWidth;
    }
    if (mouseY + menuHeight > pageHeight) {
        mouseY -= menuHeight;
    }

    contextMenu.style.top = mouseY + "px";
    contextMenu.style.left = mouseX + "px";

    contextMenu.style.display = "block";



});

document.addEventListener("click", (event) => {

    const contextMenu = document.getElementById("contextMenu");
    if (
        event.target !== contextMenu &&
        !contextMenu.contains(event.target)
    ) {
        contextMenu.style.display = "none";

    }
});
function copyMessage(e, id) {
    let clips = document.getElementById("p" + id).innerText;
    console.log(clips)
}
let thm = 0;
function showThemeMenu() {
    const thmen = document.getElementById('themeprompt');
    if (thm == 0) {
        thmen.style.display = 'flex'
        thm = 1
    } else {
        thmen.style.display = 'none'
        thm = 0
        showOptions()
    }
    showOptions()

}
function setTheme() {
    const option = document.getElementById('themeip').value
    themeApplier(option)
    showThemeMenu()
}
const themes = {
    //------ navclr---- navtxt---- chatbg ----inputbg --inputclr ---senderm ---recm ------sendc -----rec c
    white: ["#f5f5f5", "#000000", "#ffffff", "#ffffff", "#007bff", "#e9e9eb", "#007bff", "#000000", "#ffffff"],
    black: ["#0c0c0c", "#ffffff", "#000000", "#0c0c0c", "#067dfe", "#212027", "#007bff", "#efefef", "#ffffff"],
    bubble: ["#804d3a", "#ae8070", "#814e3b", "#3b261d", "#ca8c53", "#4e2b01", "#CB7F45", "#efefef", "#ffffff", "bubble.jpg"],
    avocado: ["#effedd", "#268700", "#effedd", "#effedd", "#268700", "#f7ffc1", "#8ac573", "#268700", "#ffffff", "avocado.jpg"],
    boo: ["#adccfa", "#268700", "#effedd", "#fff", "#f00", "#f7ffc1", "#8ac573", "#268700", "#ffffff", "boo.jpg"],

}

themeApplier('avocado')
function themeApplier(theme) {


    // document.body.style.background = themes[theme][0];
    document.getElementById("metacl").content = themes[theme][0];
    document.getElementById("mex").style.background = themes[theme][0];
    document.body.style.setProperty('--nav-color', themes[theme][0]);
    document.body.style.setProperty('--nav-text', themes[theme][1]);
    document.body.style.setProperty('--chat-bg', themes[theme][2]);
    document.body.style.setProperty('--input-bg', themes[theme][3]);
    document.body.style.setProperty('--input-clr', themes[theme][4]);
    document.body.style.setProperty('--chat-r-bg', themes[theme][5]);
    document.body.style.setProperty('--chat-s-bg', themes[theme][6]);
    document.body.style.setProperty('--chat-r-c', themes[theme][7]);
    document.body.style.setProperty('--chat-s-c', themes[theme][8]);
    if (themes[theme][9]) {
        document.getElementById('chatx').style.background = `url(theme/${themes[theme][9]})`
    }
}
