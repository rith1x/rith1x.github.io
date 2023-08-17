

window.addEventListener("load", function() {
  var loader = document.getElementById("loader");
  loader.classList.remove("is-active");
});


function fetchMessages() {
  fetch("https://api.jsonbin.io/v3/b/64dbc8b78e4aa6225ed07a60?meta=false ")
    .then(response => response.json())
    .then(data => {
      messages = data;
      displayMessages();
    });
}

function displayMessages() {
  var messagesDiv = document.getElementById("products");
  messagesDiv.innerHTML = "";

  for (var i = 0; i < messages.length; i++) {
    var message = messages[i];
    var anchorLink = document.createElement("a");
    anchorLink.className = "productslink";
    anchorLink.setAttribute("onclick", "storeSelectedProduct(event, '" + message.id + "')");

    var messageDiv = document.createElement("div");
    messageDiv.className = "product";
    messageDiv.id = message.id;

    messagesDiv.appendChild(anchorLink);
    anchorLink.appendChild(messageDiv);


    var productImage = document.createElement("img");
    productImage.src = message.link;
    productImage.className = 'Pimg';
    messageDiv.appendChild(productImage);

    var EventTitle = document.createElement("p");
    EventTitle.textContent = message.name;
    EventTitle.className = 'Ptitle';
    messageDiv.appendChild(EventTitle);


    var spanny = document.createElement("span");
    spanny.className = 'Pcost';
    var price = document.createElement("p");
    price.textContent = 'Rs.' + message.price;
    price.className = 'Pprice';
    spanny.appendChild(price);
    var mrp = document.createElement("p");
    mrp.textContent = 'Rs.' + message.mrp;
    mrp.className = 'Pmrp';
    spanny.appendChild(mrp);



    messageDiv.appendChild(spanny);






  }

}




window.onload = function() {
  fetchMessages();
  cartShower();
  // MyCheck();
};


// Function to delete the stored product ID from local storage



// Function to store the ID of the div in local storage and perform further actions
function storeSelectedProduct(event, divId) {
  event.preventDefault();
  // localStorage.removeItem("selectedProduct");
  // localStorage.removeItem("selectedProductDetails");
  localStorage.setItem("selectedProduct", divId);
  // location.hash = "product";
  window.location.href = 'product.html';

}


// Event listener for back action on phone
// window.addEventListener("popstate", deleteSelectedProduct);

// Event listener for button click



