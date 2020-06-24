/// <reference path="gameobject.ts" />

class Horn extends GameObject implements Subject {
    private observers : Observer[] = []
    
    constructor() {
        super()

        this._position = new Vector(
            window.innerWidth / 2 - this.clientWidth / 2,
            window.innerHeight / 2 - this.clientHeight / 2)

        this.draw()
        this.addEventListener("click", () => this.onClick())
    }

    onClick() {
        this.notifyObservers()
        MessageBoard.getInstance().addMessage("Horn: !!!!!!!!!!!")
    }

    register(o: Observer): void {
        this.observers.push(o)
    }
    unregister(o: Observer): void {
        let index = this.observers.indexOf(o)
        this.observers.splice(index, 1)
    }
    notifyObservers(): void {
        for(const observer of this.observers) {
            observer.notify()
        }
    }
}

window.customElements.define("horn-component", Horn)