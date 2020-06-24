/// <reference path="ship.ts" />

class PirateShip extends Ship implements Observer{
    // Fields
    private captain : Captain
    private horn : Horn
    private registered : boolean
    private colorNumbers : number[] = [4,5,6,7,8,9]

    constructor(horn : Horn) {
        super()

        this.captain = new Captain(this)
        this.horn = horn
        this.registered = false
        this.draw()

        this.addEventListener("click", () => this.checkRegister())
    }
    notify(): void {
       console.log("Notified.")
       this.captain.wakeUp()
    }

    checkRegister() {
        if(this.registered == false) { 
            this.horn.register(this)
            this.registered = true
            const randomColorNumber = this.colorNumbers[Math.floor(Math.random() * this.colorNumbers.length)];
            this.style.backgroundImage = `url(images/ship${randomColorNumber}.png)`
        } else { 
            this.horn.unregister(this) 
            this.registered = false
            this.style.backgroundImage  = "url(images/ship-unregistered.png)"
            this.captain.style.backgroundImage = "url(images/emote_sleeps.png)"
        }
        console.log("Clicked")
    }
    
}

window.customElements.define("ship-component", PirateShip as any)