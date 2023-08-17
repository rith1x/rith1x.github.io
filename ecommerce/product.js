var backButton = document.getElementById("backButton");
backButton.addEventListener("click", deleteSelectedProduct);

function deleteSelectedProduct() {
    localStorage.removeItem("selectedProduct");
    localStorage.removeItem("selectedProductDetails");
    window.location.href = 'index.html';
}
sample();
function sample() {
const selectedProductId = localStorage.getItem('selectedProduct');
fetch('https://api.jsonbin.io/v3/b/64dbc8b78e4aa6225ed07a60?meta=false')
  .then(response => response.json())
  .then(products => {
    const selectedProduct = products.find(product => product.id === selectedProductId);
    localStorage.setItem('selectedProductDetails', JSON.stringify(selectedProduct));
    console.log(selectedProduct);
const productName = document.getElementById("productName");
const productDesc = document.getElementById("productDesc");
const productPrice = document.getElementById("productPrice");
const productMrp = document.getElementById("productMrp");
const productReview = document.getElementById("productReview");
const pageHead = document.getElementById("pageHead");
const splFeat1 = document.getElementById("sp1");
const splFeat2 = document.getElementById("sp2");
const splFeat3 = document.getElementById("sp3");
const splFeat4 = document.getElementById("sp4");
const splFeat5 = document.getElementById("sp5");
const mrpCost = selectedProduct.mrp;
const priceCost = selectedProduct.price;
const savings = mrpCost - priceCost;
const savePercent = savings / mrpCost * 100;
const savePercF = savePercent.toFixed() + '%';
const savePrice = document.getElementById('savePrice');

pageHead.textContent = 'Fashion. -' +  ' ' + selectedProduct.name ;
splFeat1.textContent = selectedProduct.features[0];
splFeat2.textContent = selectedProduct.features[1];
splFeat3.textContent = selectedProduct.features[2];
splFeat4.textContent = selectedProduct.features[3];
splFeat5.textContent = selectedProduct.features[4];
productName.textContent = selectedProduct.name + ' ' +'Size M';
productDesc.textContent = selectedProduct.description;
productPrice.textContent = 'Rs.' + selectedProduct.price;
productMrp.textContent =  'Rs.' + selectedProduct.mrp;
productReview.innerHTML = '<p>' + selectedProduct.review + '</p><i class="fa-solid fa-star"></i>';
savePrice.textContent = 'Save' + ' ' + savePercF;
})
  .catch(error => {
    console.error('Error fetching products:', error);
  });
  }