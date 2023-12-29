let groceryData;
fetchLocalData();
function showlistpop() {
    const thEl = document.getElementById('createlistpop');
    thEl.style.display = "flex";
    thEl.style.animationPlayState = "running"
}
function closelistpop() {
    const thEl = document.getElementById('createlistpop');
    thEl.style.display = "None";

}

function idGenerator() {
    const constraints = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let genId = "";
    while (genId.length < 10) {
        genId += constraints[Math.floor(Math.random() * constraints.length)]
    }
    groceryData.cache.push(genId);
    syncData();
    return genId;
}
function syncData() {
    localStorage.setItem("groceryData", JSON.stringify(groceryData))
}
function fetchLocalData() {
    let oldList = localStorage.getItem('groceryData');
    if (!oldList) {
        const template = {
            "groceryLists": {
            },
            "cache": []
        }
        localStorage.setItem('groceryData', JSON.stringify(template));
    }
    groceryData = JSON.parse(localStorage.getItem('groceryData'));
}
function geTime() {
    const now = new Date();
    let genhrs = now.getHours();
    let genmin = now.getMinutes();
    let ampm = "am";
    if (genhrs > 12) {
        genhrs -= 12;
        ampm = "pm"

    }
    if (genhrs < 10) {
        genhrs = "0" + genhrs;
    }
    if (genmin < 10) {
        genmin = "0" + genmin;

    }
    let finalTime = genhrs + ":" + genmin + ampm;

    const stringer = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear() + " at " + finalTime;
    return stringer;
}
function createList() {
    const listName = document.getElementById('listname').value;
    const listId = idGenerator();
    const creationtime = geTime();
    const newList = {
        "name": listName,
        "id": listId,
        "created": creationtime
    }
    appendData(listId, newList);

}
function appendData(id, data) {
    groceryData.groceryLists[id] = data;
    localStorage.setItem('groceryData', JSON.stringify(groceryData));
}