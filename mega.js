let nv = 0;
function showNav() {
    if (nv == 0) {
        nv = 1
        document.getElementById('menu').style.transform = "translateX(0)"
        document.getElementById('mbtn').innerHTML = '<i class="fa-solid fa-arrow-right"></i>'
    } else {
        nv = 0
        document.getElementById('menu').style.transform = "translateX(100%)"
        document.getElementById('mbtn').innerHTML = '<i class="fa-solid fa-bars"></i>'
    }
}
function porter(dest) {
    window.location.href = `https://rith1x.github.io/${dest}`
}