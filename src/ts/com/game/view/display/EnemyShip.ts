class EnemyShip extends AbstractView {

    private ship:PIXI.extras.MovieClip;
    private moveTimer:Timer;
    private fireTimer:Timer;
    private tweens:Dictionary<string, TweenMax>;

    public create():void {
        super.create();
        this.createShip();
        this.createTweens();
        this.startMoveTimer();
        this.startFireTimer();
    }

    public dispose():void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.moveTimer.removeEventListener(TimerEvent.TIMER, this);
        this.fireTimer.removeEventListener(TimerEvent.TIMER, this);
        this.removeGame(PlayerBulletEvent.MOVE, this);
        this.dispatchGame(new EnemyShipEvent());
    }

    public addEventListeners():void {
        this.listenGame(PlayerBulletEvent.MOVE, this.handlePlayerBullet, this);
    }

    private createShip():void {
        this.ship = AssetManager.getMovieClip(AssetManager.ENEMY_SHIP);
        this.ship.play();
        this.addChild(this.ship);
    }

    private createTweens():void {
        this.tweens = new Dictionary<string, TweenMax>();
    }

    private startMoveTimer():void {
        this.moveTimer = new Timer(1000);
        this.moveTimer.addEventListener(TimerEvent.TIMER, this.handleMoveTimerUpdate, this);
        this.moveTimer.start();
    }

    private startFireTimer():void {
        this.fireTimer = new Timer(1500);
        this.fireTimer.addEventListener(TimerEvent.TIMER, this.handleFireTimeUpdate, this);
        this.fireTimer.start();
    }

    private handleMoveTimerUpdate(event:TimerEvent):void {
        this.move(this.randomPoint);
    }

    private handleFireTimeUpdate(event:TimerEvent):void {
        new EnemyBullet(this.model, this.ship.position.clone()).fire();
    }

    private handlePlayerBullet(event:PlayerBulletEvent):void {
        if (BoundsUtil.isInBounds(this.ship, event.getBullet().getSprite())) {
            this.dispose();
        }
    }

    private move(point:PIXI.Point):void {
        this.tweens.setValue("x", TweenMax.to(this.ship.position, 1, {"x": point.x, ease: Linear.easeIn}));
        this.tweens.setValue("y", TweenMax.to(this.ship.position, 1, {"y": point.y, ease: Linear.easeIn}));
    }

    private get randomPoint():PIXI.Point {
        let x:number = Math.random() * (this.renderer.getGameSize().x - this.ship.width);
        let y:number = Math.random() * (this.renderer.getGameSize().y - this.ship.height - 150);
        return new PIXI.Point(x, y);
    }

}