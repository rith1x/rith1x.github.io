let groceryData;


document.addEventListener("DOMContentLoaded", function() {
    fetchLocalData();

    viewLists();
});


function showlistpop() {
    const thEl = document.getElementById('createlistpop');
    document.getElementById('listname').focus();
    thEl.style.display = "flex";
    thEl.style.animationPlayState = "running";

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
    localStorage.setItem("groceryData", JSON.stringify(groceryData));
    viewLists();

}

function fetchLocalData() {
    let oldList = localStorage.getItem('groceryData');
    if (!oldList) {
        const template = {
            "groceryLists": {},
            "cache": []
        }
        localStorage.setItem('groceryData', JSON.stringify(template));
    }
    groceryData = JSON.parse(localStorage.getItem('groceryData'));
    viewLists();
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

    const stringer = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear() + " at " + finalTime;
    return stringer;
}

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
    viewLists();
    closelistpop();

}

function appendData(id, data) {
    groceryData.groceryLists[id] = data;
    localStorage.setItem('groceryData', JSON.stringify(groceryData));
}

function viewLists() {
    let listData = groceryData;
    var listsDiv = document.getElementById('list');
    listsDiv.innerHTML = "";
    for (var i = 0; i < Object.keys(listData.groceryLists).length; i++) {
        var currentListId = Object.keys(listData.groceryLists)[i];
        var currentList = listData.groceryLists[currentListId];
        var listDiv = document.createElement('div');
        listDiv.className = "list-div";
        var listHead = document.createElement("div");
        listHead.className = "list-head";
        var listInfo = document.createElement("div");
        listInfo.className = "list-info";
        var listTitle = document.createElement("h1");
        listTitle.innerText = currentList.name;
        var listCreated = document.createElement("p");
        listCreated.innerText = currentList.created;
        listInfo.appendChild(listTitle);
        listInfo.appendChild(listCreated);

        var listAction = document.createElement("div");
        listAction.className = "listAction";
        var listShare = document.createElement("button");
        listShare.setAttribute("onclick", `shareList('${currentList.id}')`);
        listShare.innerHTML = '<i class="fa-solid fa-arrow-up-from-bracket"></i>';

        var listDelete = document.createElement("button");
        listDelete.setAttribute("onclick", `deleteList('${currentList.id}')`);
        listDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
        listHead.appendChild(listInfo);
        listAction.appendChild(listShare);
        listAction.appendChild(listDelete);
        listHead.appendChild(listAction);

        var listItems = document.createElement("div");
        listItems.className = "list-items";

        for (var k = 0; k < Object.keys(listData.groceryLists[currentListId].items).length; k++) {
            var currentItemName = Object.keys(listData.groceryLists[currentListId].items)[k];

            var itemDiv = document.createElement("div");
            itemDiv.className = "item";
            var itemDivTxt = document.createElement("p");
            itemDivTxt.innerText = currentItemName;
            if (groceryData.groceryLists[currentList.id].items[currentItemName] === 1) {
                itemDiv.classList.add("done");
            }

            var itemDivBtn = document.createElement("button");

            itemDivBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
            itemDivBtn.setAttribute("onclick", `itemCheck('${currentList.id}','${currentItemName}')`);
            itemDiv.appendChild(itemDivTxt);
            itemDiv.appendChild(itemDivBtn);
            listItems.appendChild(itemDiv);
        }


        var listItemS = document.createElement("div");
        listItemS.className = "item";
        var listItemSinput = document.createElement("input");
        listItemSinput.setAttribute("type", "text");
        listItemSinput.id = `${currentList.id}-item`;
        listItemSinput.setAttribute("placeholder", "Add Item");
        var listItemSbtn = document.createElement("button");
        listItemSbtn.setAttribute("onclick", `itemAdder('${currentList.id}')`);
        listItemSbtn.innerHTML = '<i class="fa-solid fa-plus"></i>';

        listItemS.appendChild(listItemSinput);
        listItemS.appendChild(listItemSbtn);
        listItems.appendChild(listItemS);


        listDiv.appendChild(listHead);
        listDiv.appendChild(listItems);

        listsDiv.appendChild(listDiv);

    }
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

function itemCheck(id, key) {


    if (groceryData.groceryLists[id].items[key] == 1) {
        groceryData.groceryLists[id].items[key] = 0;
        syncData();
    } else {
        groceryData.groceryLists[id].items[key] = 1;
        syncData();
    }



}




//https://rith1x.github.io/grocery/?id=QLU4MJO6M0-New_List-it1,it2,it3,it4,it5,it6-0,1,0,1,0,1

(function importList() {
    const currentURL = window.location.href;
    const datastrip = currentURL.split("?id=")[1];

    if (datastrip) {
        const datas = datastrip.split("-");

        if (datas.length >= 4) {
            const lId = datas[0];
            const lName = datas[1].replace(/_/g, ' ');

            const popuptext = `Do you want to import the grocery list named "${lName}"?`;
            const result = window.confirm(popuptext);

            if (result) {
                const lItem = datas[2];
                const lState = datas[3];
                const larr = lState.split(',');
                const iTime = "imported on " + geTime();
                const itemslist = lItem.split(",");
                
                const itemx = {};
                for (let m = 0; m < itemslist.length; m++) {
                    const currItem = itemslist[m];
                    itemx[currItem] = parseInt(larr[m]);
                }

                const addList = {
                    "name": lName,
                    "id": lId,
                    "created": iTime,
                    "items": itemx
                };

                appendData(lId, addList);
                viewLists();
            }
        }
    }
})();