



function fetchMessages() {
  fetch("https://api.jsonbin.io/v3/b/64a6a9a29d312622a37b27e0?meta=false ")
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
    productImage.src = message.img[0];
    productImage.loading = "lazy";
    productImage.className = 'Pimg';
    messageDiv.appendChild(productImage);

    var EventTitle = document.createElement("p");
    EventTitle.textContent = message.name;
    EventTitle.className = 'Ptitle';
    messageDiv.appendChild(EventTitle);

    var productReview = document.createElement("div");
    productReview.className = 'cardrev';
    productReview.innerHTML = '<p>' + message.review + '</p><i id="prstar" class="fa-solid fa-star"></i>';
    messageDiv.appendChild(productReview);

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
function MyCheck() {
  // Retrieve the value of the 'selectedProduct' key from local storage
  const selectedProduct = localStorage.getItem('selectedProductDetails');

  // Check if the selectedProduct value is present and redirect if true


}



window.onload = function () {
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
// function openWelForm() {
//   theBox = document.getElementById('welcomeCard');
//   theBox.style.display = 'block';
// }
// function closeWelForm() {
//   theBox = document.getElementById('welcomeCard');
//   theBox.style.display = 'none';
// }

// Event listener for back action on phone
// window.addEventListener("popstate", deleteSelectedProduct);

// Event listener for button click



