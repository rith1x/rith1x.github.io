function cartShower() {
  const lsx2 = localStorage.getItem('My Cart');
  let lsx4 = localStorage.getItem('Product Details');
  lsx4 = lsx2;

  const cart = JSON.parse(localStorage.getItem('My Cart'));
  const numberOfItems = Object.keys(cart).length;
  const displayCart = document.getElementById('cartitems');
  displayCart.textContent = numberOfItems;
  const carts = JSON.parse(localStorage.getItem('My Cart'));
  const numberOfItemss = Object.keys(carts).length;
  const displayCarts = document.getElementById('cartitemss');
  displayCarts.textContent = numberOfItemss;
}
function getFormData() {
  const name = document.getElementById('nameInput').value;
  const address = document.getElementById('addressInput').value;
  const pincode = document.getElementById('pincodeInput').value;
  const productDetails = getProductDetails(); // Implement this function to retrieve the product details
  const grandTotal = calculateGrandTotal(); // Implement this function to calculate the grand total
  return {
    name,
    address,
    pincode,
    productDetails,
    grandTotal,
  };
}
function getProductDetails() {
  const productDetails = JSON.parse(localStorage.getItem('Product Details'));
  return productDetails;
}
function calculateGrandTotal() {
  const productDetails = getProductDetails();
  let grandTotal = 0;
  for (let i = 0; i < productDetails.length; i++) {
    const totalPrice = productDetails[i].totalPrice;
    grandTotal += totalPrice;
  }
  return grandTotal;
}
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', sendWhatsAppMessage);
function displayProductDetails() {
  const cartData = JSON.parse(localStorage.getItem('My Cart'));
  const myCartItemsDiv = document.getElementById('my-cart-items');
  fetch('https://api.jsonbin.io/v3/b/64dbc8b78e4aa6225ed07a60?meta=false')
    .then((response) => response.json())
    .then((productsData) => {
      const productDetails = [];
      Object.entries(cartData).forEach(([productId, quantity]) => {
        const product = productsData.find((product) => product.id === productId);
        if (product) {
          const productName = product.name;
          const price = product.price;
          const mrp = product.mrp;
          const totalPrice = quantity * price;
          const totalMRP = quantity * mrp;
          const savingsPercentage = ((totalMRP - totalPrice) / totalMRP) * 100;
          productDetails.push({
            name: productName,
            quantity: quantity,
            price: price,
            totalPrice: totalPrice,
          });
          const productContainer = document.createElement('div');
          productContainer.className = 'product-container';
          const productNameDiv = document.createElement('div');
          productNameDiv.className = 'product-name';
          productNameDiv.textContent = productName;
          const mrpSectionDiv = document.createElement('div');
          mrpSectionDiv.className = 'price-section';
          mrpSectionDiv.innerHTML = `MRP:` + ' ₹' + `${mrp}.00`;
          const priceSectionDiv = document.createElement('div');
          priceSectionDiv.className = 'price-section';
          priceSectionDiv.innerHTML = `Price:` + ' ₹' + `${price}.00`;
          const quantitySectionDiv = document.createElement('div');
          quantitySectionDiv.className = 'quantity-section';
          const quantityLabel = document.createElement('span');
          quantityLabel.textContent = 'Quantity: ';
          // const quantityButtonMinus = document.createElement('span');
          // quantityButtonMinus.className = 'quantity-button';
          // quantityButtonMinus.textContent = '-';
          // quantityButtonMinus.addEventListener('click', () =>
          //   updateQuantity(-1, quantitySpan, totalSectionDiv, savingsSectionDiv, mrp, price, productName)
          // );
          const quantitySpan = document.createElement('span');
          quantitySpan.textContent = quantity;
          // const quantityButtonPlus = document.createElement('span');
          // quantityButtonPlus.className = 'quantity-button';
          // quantityButtonPlus.textContent = '+';
          // quantityButtonPlus.addEventListener('click', () =>
          //   updateQuantity(1, quantitySpan, totalSectionDiv, savingsSectionDiv, mrp, price, productName)
          // );
          quantitySectionDiv.appendChild(quantityLabel);
          // quantitySectionDiv.appendChild(quantityButtonMinus);
          quantitySectionDiv.appendChild(quantitySpan);
          // quantitySectionDiv.appendChild(quantityButtonPlus);
          const totalSectionDiv = document.createElement('div');
          totalSectionDiv.className = 'total-section';
          totalSectionDiv.innerHTML = `Total Price:` + ' ₹' + `${totalPrice}.00`;
          const savingsSectionDiv = document.createElement('div');
          savingsSectionDiv.className = 'savings-section';
          savingsSectionDiv.textContent = `You save ${savingsPercentage.toFixed(2)}%`;
          productContainer.appendChild(productNameDiv);
          productContainer.appendChild(mrpSectionDiv);

          productContainer.appendChild(priceSectionDiv);
          productContainer.appendChild(quantitySectionDiv);
          productContainer.appendChild(totalSectionDiv);
          productContainer.appendChild(savingsSectionDiv);
          myCartItemsDiv.appendChild(productContainer);
        }
      });
      localStorage.setItem('Product Details', JSON.stringify(productDetails));
      const gdTotal = document.getElementById('gdtl');
      gdTotal.textContent = 'Rs.' + calculateGrandTotal();
    })
    .catch((error) => {
      console.error('Error fetching product data:', error);
    });
}
function updateQuantity(change, quantitySpan, totalSectionDiv, savingsSectionDiv, mrp, price, productName) {
  let quantity = parseInt(quantitySpan.textContent);
  quantity += change;
  if (quantity < 1) {
    return;
  }
  quantitySpan.textContent = quantity;
  const totalMRP = quantity * mrp;
  const totalPrice = quantity * price;
  const savings = totalMRP - totalPrice;
  const savingsPercentage = (savings / totalMRP) * 100;
  totalSectionDiv.innerHTML = `Total Price: ${totalPrice}`;
  savingsSectionDiv.textContent = `You save ${savingsPercentage.toFixed(2)}%`;
  const productDetails = getProductDetails();
  const updatedProductDetails = productDetails.map((product) => {
    if (product.name === productName) {
      return {
        ...product,
        quantity: quantity,
        totalPrice: totalPrice,
      };
    }
    return product;
  });
  localStorage.setItem('Product Details', JSON.stringify(updatedProductDetails));
  const gdTotal = document.getElementById('gdtl');
  gdTotal.textContent = 'Rs.' + calculateGrandTotal();
}
function constructMessage() {
  const formData = getFormData();
  const { name, address, pincode, productDetails, grandTotal } = formData;
  let message = '```' + `Customer name: ${name}\n`;
  message += `Address: ${address}\n`;
  message += `Pincode: ${pincode}\n\n`;
  message += 'Product Details:\n';
  productDetails.forEach((product) => {
    message += `Name: ${product.name}\n`;
    message += `Quantity: ${product.quantity}\n`;
    message += `Price:` + ' Rs.' + `${product.price}\n`;
    message += `Total Price:` + ' Rs.' + `${product.totalPrice}\n\n`;
  });
  message += '-----\n';
  message += `No of items: ${productDetails.length}\n`;
  message += `Total Price:` + ' Rs.' + `${grandTotal}\n`;
  message += '-----\n';
  message += 'Thank You\n';
  message += 'Thulir Home Care Products' + '```';
  return encodeURIComponent(message);
}
function sendWhatsAppMessage() {
  const baseLink = 'https://api.whatsapp.com/send/?phone=&text=';
  const message = constructMessage();
  const encodedMessage = baseLink + message;
  window.open(encodedMessage);
}
displayProductDetails();
var cartbackButton = document.getElementById('cartBack');
cartbackButton.addEventListener('click', forwardHome);
function forwardHome() {
  window.location.href = 'index.html';
}
function clearCart() {
  localStorage.removeItem("My Cart");
  localStorage.removeItem("Product Details");
  window.location.reload();

}


function openForm() {
  const dialog = document.querySelector("dialog");
  dialog.show()
}
function closeForm() {
  const dialog = document.querySelector("dialog");
  dialog.close()
}

