class EnemyShipEvent extends EventObject {

    public static DEAD:string = 'EnemyShipEvent.DEAD';

    constructor() {
        super(EnemyShipEvent.DEAD);
    }
}