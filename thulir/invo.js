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
      function displayProductDetails() {
        const cartData = JSON.parse(localStorage.getItem('My Cart'));
        const myCartItemsDiv = document.getElementById('my-cart-items');
        fetch('https://api.jsonbin.io/v3/b/64a6a9a29d312622a37b27e0?meta=false')
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
                const quantitySpan = document.createElement('span');
                quantitySpan.textContent =quantity;
                quantitySectionDiv.appendChild(quantityLabel);
                quantitySectionDiv.appendChild(quantitySpan);
                const totalSectionDiv = document.createElement('div');
                totalSectionDiv.className = 'total-section';
                totalSectionDiv.innerHTML = `Total Price:`+' Rs.'+ `${totalPrice}.00`;
                const savingsSectionDiv = document.createElement('div');
                savingsSectionDiv.className = 'savings-section';
                savingsSectionDiv.textContent = `You save ${savingsPercentage.toFixed(2)}%`;
                productContainer.appendChild(productNameDiv);
                productContainer.appendChild(mrpSectionDiv);
                productContainer.appendChild(priceSectionDiv);
                productContainer.appendChild(quantitySectionDiv);
                savingsSectionDiv.appendChild(totalSectionDiv);
                productContainer.appendChild(savingsSectionDiv);
                myCartItemsDiv.appendChild(productContainer);
              }
            });
            localStorage.setItem('Product Details', JSON.stringify(productDetails));
            const gdTotal = document.getElementById('gdtl');
            gdTotal.textContent = 'Rs.' + calculateGrandTotal() +'.00';
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
          });
      }
      displayProductDetails();
