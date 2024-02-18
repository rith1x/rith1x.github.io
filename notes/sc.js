
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



function deleteNote(id) {
    var result = window.confirm("Do you want to delete the List?");
    if (result) {
        delete groceryData.groceryLists[id];
        syncData();
    }
}