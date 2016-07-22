class EnemyBulletEvent extends EventObject {

    public static MOVE:string = 'EnemyBulletEvent.MOVE';

    private bullet:EnemyBullet;

    constructor(data:EnemyBullet) {
        super(EnemyBulletEvent.MOVE);
        this.bullet = data;
    }

    public getBullet():EnemyBullet {
        return this.bullet;
    }
}