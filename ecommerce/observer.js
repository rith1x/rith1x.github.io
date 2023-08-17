
  


  function currentDiv(n) {
    showDivs(slideIndex = n);
  }
  
  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " w3-opacity-off";
  }

const productId = localStorage.getItem('selectedProduct');
function addToCart() {
  const quantity = parseInt(prompt('Enter the quantity:'));
  const cart = JSON.parse(localStorage.getItem('My Cart')) || {};
  cart[productId] = quantity;
  localStorage.setItem('My Cart', JSON.stringify(cart));
  const butxn = document.getElementById('addToCartBtn');
  butxn.innerHTML = 'Added to cart' + '<i id="fafafa" class="animate fa-solid fa-cart-shopping"></i>';
}

