class GameController {

    private eventBus:EventBus;
    private model:GameModel;

    constructor(model:GameModel) {
        this.model = model;
        this.create();
        this.addEventListeners();
    }

    private create():void {
        this.createEventBus();
    }

    private createEventBus():void {
        this.eventBus = EventBus.getInstance();
    }

    private addEventListeners():void {
        this.listen(EnemyShipEvent.DEAD, this.handleEnemyShipDead, this);
        this.listen(PlayerShipEvent.DEAD, this.handlePlayerShipDead, this);
    }

    private handleEnemyShipDead(event:EnemyShipEvent):void {
        this.model.enemyShipDead();
        this.model.updateScore(1);
        this.dispatchEvent(new PlayerScoreUpdatedEvent());
        if (this.model.getEnemiesLeft() == 0) {
            this.dispatchEvent(new GameOverEvent(GameOverEvent.WIN));
        }
    }

    private handlePlayerShipDead(event:PlayerShipEvent):void {
        this.model.playerShipDead();
        this.dispatchEvent(new PlayerLivesUpdatedEvent());
        if (this.model.getNumLives() == 0) {
            this.dispatchEvent(new GameOverEvent(GameOverEvent.LOSE));
        }
    }

    public listen(type:string, handler:Function, scope:Object):void {
        this.eventBus.addEventListener(type, handler, scope);
    }

    public remove(type:string, scope:Object):void {
        this.eventBus.removeEventListener(type, scope);
    }

    public dispatchEvent(event:EventObject) {
        this.eventBus.dispatchEvent(event);
    }
}