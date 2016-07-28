class PlayerShip extends AbstractView {

    private ship:PIXI.Sprite;

    public create() {
        super.create();
        this.createShip();
    }

    private createShip():void {
        this.ship = Style.getSprite(Style.PLAYER_SHIP);
        this.ship.interactive = true;
        this.addChild(this.ship);
        this.ship.position = new PIXI.Point(125, this.renderer.getGameSize().y - (this.renderer.getGameSize().y / 8));
    }

    public dispose():void {
        if (this.ship.parent) {
            this.removeChild(this.ship);
        }
        this.removeEventListeners();
        this.dispatch(new PlayerShipEvent());
    }

    public addEventListeners():void {
        var stage:PIXI.Container = this.renderer.getStage();
        MouseUtil.setInteractive(stage, true);
        MouseUtil.addMouseMove(stage, this.handleMouseMove, this);
        MouseUtil.addMouseDown(stage, this.handleMouseDown, this);
        this.listen(EnemyBulletEvent.MOVE, this.handleEnemyBulletMove, this);
    }

    public removeEventListeners():void {
        var stage:PIXI.Container = this.renderer.getStage();
        MouseUtil.removeMouseMove(stage, this.handleMouseMove);
        MouseUtil.removeMouseDown(stage, this.handleMouseDown);
        this.remove(EnemyBulletEvent.MOVE, this);
    }

    private handleMouseDown():void {
        var x:number = this.ship.position.x + (this.ship.width / 2);
        var y:number = this.ship.position.y;
        var bulletPosition:PIXI.Point = new PIXI.Point(x, y);
        new PlayerBullet(bulletPosition).fire();
    }

    private handleMouseMove(event:PIXI.interaction.InteractionEvent):void {
        var data:PIXI.interaction.InteractionData = event.data;
        this.ship.position = new PIXI.Point(data.global.x, this.ship.position.y);
    }

    private handleEnemyBulletMove(event:EnemyBulletEvent):void {
        if (BoundsUtil.isInBounds(this.ship, event.getBullet().getSprite())) {
            this.dispose();
        }
    }

    public revive():void {
        var stage:PIXI.Container = this.renderer.getStage();
        MouseUtil.setInteractive(stage, true);
        MouseUtil.addMouseMove(stage, this.handleMouseMove, this);
        MouseUtil.addMouseDown(stage, this.handleMouseDown, this);
        this.startFlashTimer();
        this.addChild(this.ship);
    }

    private startFlashTimer():void {
        var flashTimer:Timer = new Timer(300, 5);
        flashTimer.addEventListener(TimerEvent.TIMER, this.handleFlashTimerUpdate, this);
        flashTimer.addEventListener(TimerEvent.COMPLETE, this.handleFlashTimerComplete, this);
        flashTimer.start();
    }

    private handleFlashTimerUpdate(event:TimerEvent):void {
        this.ship.visible = !this.ship.visible;
    }

    private handleFlashTimerComplete(event:TimerEvent):void {
        this.ship.visible = true;
        this.listen(EnemyBulletEvent.MOVE, this.handleEnemyBulletMove, this);
    }
}