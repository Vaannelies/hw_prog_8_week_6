class Main {

    private ships : PirateShip[] = []

    constructor() {
        // Subject
        let horn : Horn = new Horn()

        for (let i = 0; i < 10; i++) {
            // Observers
            this.ships.push(new PirateShip(horn))
        }

        let messageboard : MessageBoard = MessageBoard.getInstance()
    }
}

window.addEventListener("load", () => new Main())