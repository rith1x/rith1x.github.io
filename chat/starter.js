const lklk = {
    [xy]: (_ms,_ky) => { return CryptoJS.AES.encrypt(_ms,_ky).toString(); },
    [yx]: (_ms,_ky) => { return CryptoJS.AES.decrypt(_ms,_ky).toString(CryptoJS.enc.Utf8); }
};
