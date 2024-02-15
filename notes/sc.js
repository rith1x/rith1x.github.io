
function createList() {
    const listName = document.getElementById('listname').value;
    const listId = idGenerator();
    document.getElementById('listname').value = "";
    const creationtime = geTime();
    const newList = {
        "name": listName,
        "id": listId,
        "created": creationtime,
        "items": {}
    }
    appendData(listId, newList);

}

function appendData(id, data) {
    groceryData.groceryLists[id] = data;
    localStorage.setItem('groceryData', JSON.stringify(groceryData));
}



function deleteList(id) {
    var result = window.confirm("Do you want to delete the List?");
    if (result) {
        delete groceryData.groceryLists[id];
        syncData();
    }
}

function shareList(id) {
    const listId = id;
    const listName = groceryData.groceryLists[id].name;
    const listItems = Object.keys(groceryData.groceryLists[id].items).join(',');
    const itemState = Object.values(groceryData.groceryLists[id].items).join(',');

    const baseUrl = "https:\/\/rith1x.github.io/grocery/";



    //rith1x.github.io/grocery?n=bansy&i=apple,mango,grape&s=101
    const queries = "?id=" + listId + "-" + listName + "-" + listItems + "-" + itemState;

    const fullUrlx = baseUrl + queries;


    const fullUrl = fullUrlx.replace(/ /g, '_');


    const qrBase = "https:\/\/chart.googleapis.com/chart?cht=qr&chs=512x512&chl=";
    const masterQr = qrBase + fullUrl;
    console.log(masterQr);
    exportpop(masterQr, fullUrl);

}


function exportpop(qrsrc, txtsrc) {
    const tHEl = document.getElementById('exportlistpop');
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

function closeexportlistpop() {
    const thEl = document.getElementById('exportlistpop');
    thEl.style.display = "None";

}

function itemAdder(id) {
    const newitem = document.getElementById(`${id}-item`).value;
    groceryData.groceryLists[id].items[newitem] = 0;
    syncData();


}

