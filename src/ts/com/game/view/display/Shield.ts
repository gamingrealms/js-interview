class Shield extends AbstractView {

    private static STRUCTURE = [ new PIXI.Point(0, 10), new PIXI.Point(1, 9), new PIXI.Point(2, 8)];

    private blocks:PIXI.Sprite [];

    public create():void {
        super.create();
        this.createBlocks();
    }

    public addEventListeners():void {
        this.listenGame(PlayerBulletEvent.MOVE, this.handlePlayerBulletMove, this);
        this.listenGame(EnemyBulletEvent.MOVE, this.handleEnemyBulletMove, this);
    }

    private createBlocks():void {
        this.blocks = [];
        for (let i:number = 0; i < Shield.STRUCTURE.length; i++) {
            let range:PIXI.Point = Shield.STRUCTURE[i];
            let block:PIXI.Sprite;
            for (let j:number = range.x; j < range.y; j++) {
                block = this.createBlock(j, i);
                this.addChild(block);
                this.blocks.push(block);
            }
        }
    }

    private createBlock(x:number, y:number):PIXI.Sprite {
        let block:PIXI.Sprite = AssetManager.getSprite(AssetManager.SHIELD);
        block.position = new PIXI.Point(x * block.width, y * block.height);
        return block;
    }

    private handlePlayerBulletMove(event:PlayerBulletEvent):void {
        let bullet:PlayerBullet = event.getBullet();
        let block:PIXI.Sprite = this.checkBlockBounds(bullet.getSprite());
        if (block) {
            block.visible = false;
            bullet.dispose();
        }
    }

    private handleEnemyBulletMove(event:EnemyBulletEvent):void {
        let bullet:EnemyBullet = event.getBullet();
        let block:PIXI.Sprite = this.checkBlockBounds(bullet.getSprite());
        if (block) {
            block.visible = false;
            bullet.dispose();
        }
    }

    private checkBlockBounds(bullet:PIXI.Sprite):PIXI.Sprite {
        for (let i:number = 0; i < this.blocks.length; i++) {
            let block:PIXI.Sprite = this.blocks[i];
            if (block.visible && BoundsUtil.isInBounds(block, bullet)) {
                return block;
            }
        }
        return null;
    }
}