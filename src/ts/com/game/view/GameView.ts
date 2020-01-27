class GameView extends AbstractView {

    private background:PIXI.Graphics;

    private playerShip:PlayerShip;
    private enemyShips:EnemyShip[];
    private shields:Array<Shield>;

    private scoreLabel:PIXI.extras.BitmapText;
    private score:PIXI.extras.BitmapText;

    private livesLabel:PIXI.extras.BitmapText;
    private lives:PIXI.extras.BitmapText;

    private gameName:PIXI.extras.BitmapText;

    constructor(model:GameModel) {
        super(model);
    }

    public create():void {
        super.create();
        this.createBackground();
        this.createPlayerShip();
        this.createEnemyShips();
        this.createShields();
        this.createFields();
    }

    public addEventListeners():void {
        this.listen(PlayerLivesUpdatedEvent.UPDATED, this.handlePlayerLivesUpdate, this);
        this.listen(PlayerScoreUpdatedEvent.UPDATED, this.handlePlayerScoreUpdate, this);
    }

    private createBackground():void {
        this.background = GraphicsUtil.createRectangle(this.renderer.getGameSize());
        this.addChild(this.background);
    }

    private createPlayerShip():void {
        this.playerShip = new PlayerShip(this.model);
        this.addChild(this.playerShip);
    }

    private createEnemyShips():void {
        this.enemyShips = [];
        let ship:EnemyShip;
        for (let i:number = 0; i < this.model.getNumEnemies(); i++) {
            ship = new EnemyShip(this.model);
            this.enemyShips.push(ship);
            this.renderer.addChild(ship);
        }
    }

    private createShields():void {
        let shieldPosition:PIXI.Point = new PIXI.Point(17, this.renderer.getGameSize().y - (this.renderer.getGameSize().y / 5));
        this.shields = [];
        let shield:Shield;
        for (let i:number = 0; i < this.model.getNumShields(); i++) {
            shield = new Shield(this.model);
            shield.position = shieldPosition;
            shieldPosition = new PIXI.Point(shieldPosition.x + (this.renderer.getGameSize().x / this.model.getNumShields()), shieldPosition.y);
            this.addChild(shield);
            this.shields.push(shield);
        }
    }

    private createFields():void {
        this.createScoreLabel();
        this.createScore();
        this.createLivesLabel();
        this.createLives();
        this.createGameName();
    }

    private createScoreLabel():void {
        this.scoreLabel = new PIXI.extras.BitmapText("score", {font: Font.HELVETICA, align: "right"});
        this.scoreLabel.position = new PIXI.Point(75, this.renderer.getGameSize().y - 20);
        this.addChild(this.scoreLabel);
    }

    private createScore():void {
        this.score = new PIXI.extras.BitmapText(this.model.getScore().toString(), {
            font: Font.HELVETICA,
            align: "left"
        });
        this.score.position = new PIXI.Point(115, this.renderer.getGameSize().y - 20);
        this.addChild(this.score);
    }

    private createLivesLabel():void {
        this.livesLabel = new PIXI.extras.BitmapText("lives", {font: Font.HELVETICA, align: "right"});
        this.livesLabel.position = new PIXI.Point(5, this.renderer.getGameSize().y - 20);
        this.addChild(this.livesLabel);
    }

    private createLives():void {
        this.lives = new PIXI.extras.BitmapText(this.model.getNumLives().toString(), {
            font: Font.HELVETICA,
            align: "left"
        });
        this.lives.position = new PIXI.Point(40, this.renderer.getGameSize().y - 20);
        this.addChild(this.lives);
    }

    private createGameName():void {
        this.gameName = new PIXI.extras.BitmapText("spaceinvaders", {font: Font.HELVETICA, align: "right"});
        this.gameName.position = new PIXI.Point(210, this.renderer.getGameSize().y - 20);
        this.addChild(this.gameName);
    }

    private handlePlayerScoreUpdate(event:PlayerScoreUpdatedEvent):void {
        this.score.text = this.model.getScore().toString();
    }

    private handlePlayerLivesUpdate(event:PlayerLivesUpdatedEvent):void {
        this.lives.text = this.model.getNumLives().toString();
        if (this.model.getNumLives() > 0) {
            this.playerShip.revive();
        }
    }
}