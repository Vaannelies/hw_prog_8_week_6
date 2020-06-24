class Captain extends HTMLElement{
    private timer : number
    private awake : boolean

    constructor(pirateShip : PirateShip) {
        super()
        this.timer = 100
        this.awake = false
        pirateShip.appendChild(this)
    }

    wakeUp() {
        this.style.backgroundImage = "url(images/emote_alert.png)"
        console.log("Awake")
    }

}

window.customElements.define("captain-component", Captain as any)