class GameModel {

    private config:ConfigData;
    private numEnemies:number;
    private numLives:number;
    private numShields:number;
    private enemiesLeft:number;
    private score:number;

    constructor(config:ConfigData) {
        this.config = config;
        this.reset();
    }

    public reset():void {
        this.numEnemies = this.config.getNumEnemies();
        this.numLives = this.config.getNumLives();
        this.numShields = this.config.getNumShields();
        this.enemiesLeft = this.config.getNumEnemies();
        this.score = 0;
    }

    public enemyShipDead():void {
        this.enemiesLeft--;
    }

    public playerShipDead():void {
        this.numLives--;
    }

    public updateScore(value:number):void {
        this.score += value;
    }

    public getEnemiesLeft():number {
        return this.enemiesLeft;
    }

    public getScore():number {
        return this.score;
    }

    public getNumLives():number {
        return this.numLives;
    }

    public getNumEnemies():number {
        return this.numEnemies;
    }

    public getNumShields():number {
        return this.numShields;
    }
}