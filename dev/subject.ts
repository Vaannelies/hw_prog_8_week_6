interface Subject {
    register(o : Observer) : void
    unregister(o : Observer) : void
    notifyObservers() : void
}