document.addEventListener('DOMContentLoaded', function() {
    // Check if user details exist in local storage
    if (!localStorage.getItem('userDetails')) {
      // User details not found in local storage, show pop-up form
      showWelForm();
    }
  });
  function closeWelForm() {
    const formie = document.getElementById('welPop');
    formie.style.display = 'none';
  }
  
  function showWelForm() {
    const formie = document.getElementById('welPop');
    formie.style.display = 'grid';
    // Show the pop-up form here
    const form = document.getElementById('userForm');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Get form values
      const name = document.getElementById('nameInput').value;
      const address = document.getElementById('addressInput').value;
      const pincode = document.getElementById('pincodeInput').value;
      const contact = document.getElementById('contactInput').value;
  
      // Save user details to local storage
      const userDetails = {
        name: name,
        address: address,
        pincode: pincode,
        contact: contact
      };
  
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      closeWelForm();
    });
  }
  