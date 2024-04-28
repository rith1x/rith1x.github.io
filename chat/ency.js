function encrypt() {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('key').value;

    // Encrypt message using AES
    const ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
    document.getElementById('ciphertext').value = ciphertext;
  }

  function decrypt() {
    const ciphertext = document.getElementById('ciphertext').value;
    const key = document.getElementById('key').value;

    // Decrypt ciphertext using AES
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedtext = bytes.toString(CryptoJS.enc.Utf8);
    document.getElementById('decryptedtext').value = decryptedtext;
  }