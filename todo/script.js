let todoData;


document.addEventListener("DOMContentLoaded", function () {
    fetchLocalData();
    importList();
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
    todoData.cache.push(genId);
    syncData();
    return genId;
}

function syncData() {
    localStorage.setItem("todoData", JSON.stringify(todoData));
    viewLists();

}

function fetchLocalData() {
    let oldList = localStorage.getItem('todoData');
    if (!oldList) {
        const template = {
            "todoLists": {},
            "cache": []
        }
        localStorage.setItem('todoData', JSON.stringify(template));
    }
    todoData = JSON.parse(localStorage.getItem('todoData'));
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
    todoData.todoLists[id] = data;
    localStorage.setItem('todoData', JSON.stringify(todoData));
}

function viewLists() {
    let listData = todoData;
    var listsDiv = document.getElementById('list');
    listsDiv.innerHTML = "";
    for (var i = 0; i < Object.keys(listData.todoLists).length; i++) {
        var currentListId = Object.keys(listData.todoLists)[i];
        var currentList = listData.todoLists[currentListId];
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

        for (var k = 0; k < Object.keys(listData.todoLists[currentListId].items).length; k++) {
            var currentItemName = Object.keys(listData.todoLists[currentListId].items)[k];

            var itemDiv = document.createElement("div");
            itemDiv.className = "item";
            var itemDivTxt = document.createElement("p");
            itemDivTxt.innerText = currentItemName;
            if (todoData.todoLists[currentList.id].items[currentItemName] === 1) {
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
        delete todoData.todoLists[id];
        syncData();
    }
}

function shareList(id) {
    const listId = id || "koko";
    const listName = todoData.todoLists[id].name;
    const listItems = Object.keys(todoData.todoLists[id].items).join(',');
    const itemState = Object.values(todoData.todoLists[id].items).join(',');

    const baseUrl = "https:\/\/rith1x.github.io/todo/";



    //rith1x.github.io/todo?n=bansy&i=apple,mango,grape&s=101
    const queries = "?id=" + listId + "-" + listName + "-" + listItems + "-" + itemState;

    const fullUrlx = baseUrl + queries;


    const fullUrl = fullUrlx.replace(/ /g, '_');


    const qrBase = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=";
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
    todoData.todoLists[id].items[newitem] = 0;
    syncData();


}

function itemCheck(id, key) {


    if (todoData.todoLists[id].items[key] == 1) {
        todoData.todoLists[id].items[key] = 0;
        syncData();
    } else {
        todoData.todoLists[id].items[key] = 1;
        syncData();
    }



}




//https://rith1x.github.io/todo/?id=QLU4MJO6M0-New_List-it1,it2,it3,it4,it5,it6-0,1,0,1,0,1

function importList() {
    const currentURL = window.location.href;
    console.log(currentURL);
    const datastrip = currentURL.split("?id=")[1];
    console.log(datastrip);

    if (datastrip) {
        const datas = datastrip.split("-");
        console.log(datas)
        if (datas.length >= 4) {
            const lId = datas[0];
            console.log(lId);
            const lName = datas[1].replace(/_/g, ' ');
            console.log(lName);
            const popuptext = `Do you want to import the todo list named "${lName}"?`;
            const result = window.confirm(popuptext);
            console.log(result);

            if (result) {
                const lItem = datas[2];
                const lState = datas[3];
                const larr = lState.split(',');
                const iTime = "imported on " + geTime();
                const itemslist = lItem.split(",");

                const itemx = {};

                console.log(lItem);
                console.log(lState);
                console.log(larr);
                console.log(iTime);
                console.log(itemslist);


                for (let m = 0; m < itemslist.length; m++) {
                    const currItem = itemslist[m];
                    itemx[currItem] = parseInt(larr[m]);


                    console.log(m + currItem);
                    console.log(itemx[currItem]);
                    console.log(Object.keys(itemx));
                }

                const importedList = {
                    "name": lName,
                    "id": lId,
                    "created": iTime,
                    "items": itemx
                };
                console.log(importedList);


                todoData.todoLists[lId] = importedList;
                localStorage.setItem('todoData', JSON.stringify(todoData));


                console.log("appdatadone");
                window.location.href = currentURL.split("?id=")[0];
                viewLists();

            }
        }
    }
}
