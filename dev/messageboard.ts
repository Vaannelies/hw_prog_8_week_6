/// <reference path="gameobject.ts" />


class MessageBoard extends GameObject{
    // Fields
    // private messages : HTMLElement[] = []

    private static instance : MessageBoard

    private constructor() {
        super()
    }

    public static getInstance() : MessageBoard {
        if(!MessageBoard.instance) MessageBoard.instance = new MessageBoard()
        return(MessageBoard.instance)

    }
    
    public addMessage(text : string) {
        let message = document.createElement("message")
        message.innerHTML = text
        this.appendChild(message) 
        
    }
}

window.customElements.define("messageboard-component", MessageBoard as any)