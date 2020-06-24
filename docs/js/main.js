"use strict";
class Captain extends HTMLElement {
    constructor(pirateShip) {
        super();
        this.timer = 100;
        this.awake = false;
        pirateShip.appendChild(this);
    }
    wakeUp() {
        this.style.backgroundImage = "url(images/emote_alert.png)";
        console.log("Awake");
    }
}
window.customElements.define("captain-component", Captain);
class GameObject extends HTMLElement {
    constructor() {
        super();
        this._position = new Vector(0, 0);
        this.rotation = 0;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }
    get position() { return this._position; }
    draw() {
        this.style.transform = `translate(${this._position.x}px, ${this._position.y}px) rotate(${this.rotation}deg)`;
    }
}
class Horn extends GameObject {
    constructor() {
        super();
        this.observers = [];
        this._position = new Vector(window.innerWidth / 2 - this.clientWidth / 2, window.innerHeight / 2 - this.clientHeight / 2);
        this.draw();
        this.addEventListener("click", () => this.onClick());
    }
    onClick() {
        this.notifyObservers();
        MessageBoard.getInstance().addMessage("Horn: !!!!!!!!!!!");
    }
    register(o) {
        this.observers.push(o);
    }
    unregister(o) {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    }
    notifyObservers() {
        for (const observer of this.observers) {
            observer.notify();
        }
    }
}
window.customElements.define("horn-component", Horn);
class Main {
    constructor() {
        this.ships = [];
        let horn = new Horn();
        for (let i = 0; i < 10; i++) {
            this.ships.push(new PirateShip(horn));
        }
        let messageboard = MessageBoard.getInstance();
    }
}
window.addEventListener("load", () => new Main());
class MessageBoard extends GameObject {
    constructor() {
        super();
    }
    static getInstance() {
        if (!MessageBoard.instance)
            MessageBoard.instance = new MessageBoard();
        return (MessageBoard.instance);
    }
    addMessage(text) {
        let message = document.createElement("message");
        message.innerHTML = text;
        this.appendChild(message);
    }
}
window.customElements.define("messageboard-component", MessageBoard);
class Ship extends GameObject {
    constructor() {
        super();
        this.activeImage = "";
        this.colors = ["Green", "Blue", "Orange", "White", "Black", "Red"];
        this._color = "";
        this.rotation = Math.random() * 360;
        this._position = new Vector(Math.random() * window.innerWidth - this.clientWidth, Math.random() * window.innerHeight - this.clientHeight);
        this.createShip();
    }
    get color() { return this._color; }
    createShip() {
        Ship.numberOfShips++;
        if (Ship.numberOfShips > 6)
            Ship.numberOfShips = 1;
        this.activeImage = `url(images/ship${Ship.numberOfShips + 3}.png)`;
        this.style.backgroundImage = "url(images/ship-unregistered.png)";
        this._color = this.colors[Ship.numberOfShips - 1];
    }
}
Ship.numberOfShips = 0;
class PirateShip extends Ship {
    constructor(horn) {
        super();
        this.colorNumbers = [4, 5, 6, 7, 8, 9];
        this.captain = new Captain(this);
        this.horn = horn;
        this.registered = false;
        this.draw();
        this.addEventListener("click", () => this.checkRegister());
    }
    notify() {
        console.log("Notified.");
        this.captain.wakeUp();
    }
    checkRegister() {
        if (this.registered == false) {
            this.horn.register(this);
            this.registered = true;
            const randomColorNumber = this.colorNumbers[Math.floor(Math.random() * this.colorNumbers.length)];
            this.style.backgroundImage = `url(images/ship${randomColorNumber}.png)`;
        }
        else {
            this.horn.unregister(this);
            this.registered = false;
            this.style.backgroundImage = "url(images/ship-unregistered.png)";
        }
        console.log("Clicked");
    }
}
window.customElements.define("ship-component", PirateShip);
class Vector {
    constructor(x, y) {
        this._x = 0;
        this._y = 0;
        this._x = x;
        this._y = y;
    }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
}
//# sourceMappingURL=main.js.map