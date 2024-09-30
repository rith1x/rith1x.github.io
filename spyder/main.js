
let lastScrollTop = 0; // Track last scroll position
let scroll = false
let activeDomain = ""
let padLock = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#00dd47" d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>'
const funMenu = document.getElementById('funBar')
const tabMenu = document.getElementById('tabBar')
const btmMenu = document.getElementById('bottombar')
const activeTabAddr = document.getElementById('activeTab')
const iframe = document.getElementById('ifra');
document.addEventListener('DOMContentLoaded', () => {
    activeDomain = iframe.contentWindow.document.title
    console.log(iframe)
    let iframeWindow = iframe.contentWindow;

    iframeWindow.addEventListener('scroll', function () {
        let scrollTop = iframeWindow.document.documentElement.scrollTop || iframeWindow.document.body.scrollTop;

        if (scrollTop > lastScrollTop) {
            scroll = true

        } else if (scrollTop < lastScrollTop) {
            scroll = false
        }
        funMenuHandler()
        lastScrollTop = scrollTop; // Update the last scroll position
    });

})
function funMenuHandler() {
    if (scroll) {
        console.log("lol")
        funMenu.style.height = "0px"
        tabMenu.style.height = "20px"
        btmMenu.style.paddingBlock = "7px"
        funMenu.style.visibility = "hidden"
        activeTabAddr.classList.add("scrolled")
        activeTabAddr.innerHTML = padLock + activeDomain
    } else {
        funMenu.style.visibility = "visible"
        // btmMenu.style.paddingBlock = "0px 20px"
        funMenu.style.height = "50px"
        tabMenu.style.height = "50px"
        activeTabAddr.classList.remove("scrolled")

    }
}
