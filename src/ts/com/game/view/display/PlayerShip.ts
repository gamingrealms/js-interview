class PlayerShip extends AbstractView {

    private ship: PIXI.Sprite;

    public create() {
        super.create();
        this.createShip();
    }

    private createShip(): void {
        this.ship = AssetManager.getSprite(Asset.PLAYER_SHIP);
        this.ship.interactive = true;
        this.addChild(this.ship);
        this.ship.position = new PIXI.Point(125, this.renderer.getGameSize().y - (this.renderer.getGameSize().y / 8));
    }

    public dispose(): void {
        if (this.ship.parent) {
            this.removeChild(this.ship);
        }
        this.removeEventListeners();
        this.dispatchGame(new PlayerShipEvent());
    }

    public addEventListeners(): void {
        let stage: PIXI.Container = this.renderer.getStage();
        MouseUtil.setInteractive(stage, true);
        MouseUtil.addMouseMove(stage, this.handleMouseMove, this);
        MouseUtil.addMouseDown(stage, this.handleMouseDown, this);
        this.listenGame(EnemyBulletEvent.MOVE, this.handleEnemyBulletMove, this);
    }

    public removeEventListeners(): void {
        let stage: PIXI.Container = this.renderer.getStage();
        MouseUtil.removeMouseMove(stage, this.handleMouseMove);
        MouseUtil.removeMouseDown(stage, this.handleMouseDown);
        this.removeGame(EnemyBulletEvent.MOVE, this);
    }

    private handleMouseDown(): void {
        let x: number = this.ship.position.x + (this.ship.width / 2);
        let y: number = this.ship.position.y;
        let bulletPosition: PIXI.Point = new PIXI.Point(x, y);
        new PlayerBullet(this.model, bulletPosition).fire();
    }

    private handleMouseMove(event: PIXI.interaction.InteractionEvent): void {
        let data: PIXI.interaction.InteractionData = event.data;
        this.ship.position = new PIXI.Point(data.global.x, this.ship.position.y);
    }

    private handleEnemyBulletMove(event: EnemyBulletEvent): void {
        if (BoundsUtil.isInBounds(this.ship, event.getBullet().getSprite())) {
            this.dispose();
        }
    }

    public revive(): void {
        let stage: PIXI.Container = this.renderer.getStage();
        MouseUtil.setInteractive(stage, true);
        MouseUtil.addMouseMove(stage, this.handleMouseMove, this);
        MouseUtil.addMouseDown(stage, this.handleMouseDown, this);
        this.startFlashTimer();
        this.addChild(this.ship);
    }

    private startFlashTimer(): void {
        let flashTimer: Timer = new Timer(300, 5);
        flashTimer.addEventListener(TimerEvent.TIMER, this.handleFlashTimerUpdate, this);
        flashTimer.addEventListener(TimerEvent.COMPLETE, this.handleFlashTimerComplete, this);
        flashTimer.start();
    }

    private handleFlashTimerUpdate(event: TimerEvent): void {
        this.ship.visible = !this.ship.visible;
    }

    private handleFlashTimerComplete(event: TimerEvent): void {
        this.ship.visible = true;
        this.listenGame(EnemyBulletEvent.MOVE, this.handleEnemyBulletMove, this);
    }
}