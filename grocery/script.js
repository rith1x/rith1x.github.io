
let groceryData;


document.addEventListener("DOMContentLoaded", function () {
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
            "groceryLists": {
            },
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
        "items":{
        }
    }
    appendData(listId, newList);
    viewLists();
    closelistpop();

}
function appendData(id, data) {
    groceryData.groceryLists[id] = data;
    localStorage.setItem('groceryData', JSON.stringify(groceryData));
}
function viewLists(){
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
        var listCreated =document.createElement("p");
        listCreated.innerText = currentList.created;
        listInfo.appendChild(listTitle);
        listInfo.appendChild(listCreated);
        var listDelete = document.createElement("button");
        listDelete.setAttribute("onclick",`deleteList('${currentList.id}')`);
        listDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
        listHead.appendChild(listInfo);
        listHead.appendChild(listDelete);
 
        var listItems = document.createElement("div");
        listItems.className = "list-items";

        for (var k = 0; k < Object.keys(listData.groceryLists[currentListId].items).length; k++) {
            var currentItemName = Object.keys(listData.groceryLists[currentListId].items)[k];
        
            var itemDiv = document.createElement("div");
            itemDiv.className = "item";
            var itemDivTxt = document.createElement("p");
            itemDivTxt.innerText = currentItemName;
            if (groceryData.groceryLists[currentList.id].items[currentItemName] === 1){
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
        listItemSinput.setAttribute("type","text");
        listItemSinput.id = `${currentList.id}-item`;
        listItemSinput.setAttribute("placeholder","Add Item");
        var listItemSbtn = document.createElement("button");
        listItemSbtn.setAttribute("onclick",`itemAdder('${currentList.id}')`);
        listItemSbtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        
        listItemS.appendChild(listItemSinput);
        listItemS.appendChild(listItemSbtn);
        listItems.appendChild(listItemS);
        
        
        listDiv.appendChild(listHead);
        listDiv.appendChild(listItems);

        listsDiv.appendChild(listDiv);

    }
}
function deleteList(id){
    var result = window.confirm("Do you want to delete the List?");
    if(result){
        delete groceryData.groceryLists[id];
        syncData();
    } 
}
function itemAdder(id){
    const newitem = document.getElementById(`${id}-item`).value;
    groceryData.groceryLists[id].items[newitem] = 0;
    syncData();


}
function itemCheck(id,key){


    if (groceryData.groceryLists[id].items[key] == 1){
        groceryData.groceryLists[id].items[key] = 0;
        syncData();
    } else {
        groceryData.groceryLists[id].items[key] = 1;
        syncData();
    }


    
}

function queryCheck(){
    const theUrl = window.location.href;
    console.log(theUrl);
    document.write(theUrl);
}

