class PlayerBullet extends AbstractView {

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
        if(this.parent) {
            this.renderer.removeChild(this);
        }
    }

    private createBullet():void {
        this.sprite = AssetManager.getSprite(Asset.PLAYER_BULLET);
        this.addChild(this.sprite);
    }

    public fire():void {
        this.renderer.addChild(this);
        this.tween = TweenMax.to(this.sprite.position, 1,
            {
                y: 0,
                ease: Linear.easeNone,
                onUpdate: this.handleTweenUpdate,
                onUpdateScope: this,
                onComplete: this.handleTweenComplete,
                onCompleteScope: this
            });
    }

    private handleTweenUpdate() {
        this.dispatchGame(new PlayerBulletEvent(this));
    }

    private handleTweenComplete() {
        this.dispose();
    }

    public getSprite() {
        return this.sprite;
    }
}

