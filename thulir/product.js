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
fetch('https://api.jsonbin.io/v3/b/64a6a9a29d312622a37b27e0?meta=false')
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
const slide1 = document.getElementById("slide1");
const slide2 = document.getElementById("slide2");
const slide3 = document.getElementById("slide3");
const samp1 = document.getElementById("samp1");
const samp2 = document.getElementById("samp2");
const samp3 = document.getElementById("samp3");

pageHead.textContent = 'Thulir' +  ' ' + selectedProduct.name ;
splFeat1.textContent = selectedProduct.features[0];
splFeat2.textContent = selectedProduct.features[1];
splFeat3.textContent = selectedProduct.features[2];
splFeat4.textContent = selectedProduct.features[3];
splFeat5.textContent = selectedProduct.features[4];
slide1.src = selectedProduct.img[0];
slide2.src = selectedProduct.img[1];
slide3.src = selectedProduct.img[2];
samp1.src = selectedProduct.img[0];
samp2.src = selectedProduct.img[1];
samp3.src = selectedProduct.img[2];

productName.textContent = selectedProduct.name + ' ' + selectedProduct.qty;
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