export default class Tile {
    #tileEl
    #x
    #y
    #value
    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4) {
        this.#tileEl = document.createElement('div')
        this.#tileEl.classList.add('tile')
        tileContainer.append(this.#tileEl)
        this.value = value
    }
    get value() {
        return this.#value
    }
    set value(v) {
        this.#value = v;
        this.#tileEl.innerText = this.#value
        const power = Math.log2(v);
        const bgLight = 100 - power * 9
        this.#tileEl.style.setProperty('--bg-lightness', `${bgLight}%`)
        this.#tileEl.style.setProperty('--c-lightness', `${bgLight <= 50 ? 90 : 10}%`)


    }
    set x(val) {
        this.#x = val
        this.#tileEl.style.setProperty("--x", this.#x);
    }
    set y(val) {
        this.#y = val

        this.#tileEl.style.setProperty("--y", this.#y);
    }
    remove() {
        this.#tileEl.remove()
    }
    waitForTransition(animation = false) {
        return new Promise(resolve => {
            this.#tileEl.addEventListener(animation ? "animationend" : "transitionend", resolve, { once: true })
        })
    }
}