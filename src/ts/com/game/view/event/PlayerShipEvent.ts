class PlayerShipEvent extends EventObject {

    public static DEAD:string = 'PlayerShipEvent.DEAD';

    constructor() {
        super(PlayerShipEvent.DEAD);
    }
}