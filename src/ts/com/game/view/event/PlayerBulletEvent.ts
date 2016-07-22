class PlayerBulletEvent extends EventObject {

    public static MOVE:string = 'PlayerBulletEvent.MOVE';

    private bullet:PlayerBullet;

    constructor(data:PlayerBullet) {
        super(PlayerBulletEvent.MOVE);
        this.bullet = data;
    }

    public getBullet():PlayerBullet {
        return this.bullet;
    }
}