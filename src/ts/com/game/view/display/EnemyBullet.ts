class EnemyBullet extends AbstractView {

    private sprite:PIXI.Sprite;
    private tween:TweenMax;

    constructor(model:GameModel, position:PIXI.Point) {
        super(model);
        this.sprite.position = position;
    }

    public create():void {
        super.create();
        this.createBullet();
    }

    public dispose():void {
        if (this.parent) {
            this.renderer.removeChild(this);
        }
    }

    private createBullet():void {
        this.sprite = AssetManager.getSprite(AssetManager.ENEMY_BULLET);
        this.addChild(this.sprite);
    }

    public fire():void {
        this.renderer.addChild(this);
        this.tween = TweenMax.to(this.sprite.position, 1,
            {
                y: this.renderer.getGameSize().y,
                ease: Linear.easeNone,
                onUpdate: ObjectUtil.delegate(this.handleTweenUpdate, this),
                onComplete: ObjectUtil.delegate(this.handleTweenComplete, this)
            });
    }

    private handleTweenUpdate() {
        this.dispatch(new EnemyBulletEvent(this));
    }

    private handleTweenComplete() {
        this.dispose();
    }

    public getSprite() {
        return this.sprite;
    }
}