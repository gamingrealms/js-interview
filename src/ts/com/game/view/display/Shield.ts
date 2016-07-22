class Shield extends AbstractView {

    private static STRUCTURE = [ new PIXI.Point(0, 10), new PIXI.Point(1, 9), new PIXI.Point(2, 8)];

    private blocks:PIXI.Sprite [];

    public create():void {
        super.create();
        this.createBlocks();
    }

    public addEventListeners():void {
        this.listen(PlayerBulletEvent.MOVE, this.handlePlayerBulletMove, this);
        this.listen(EnemyBulletEvent.MOVE, this.handleEnemyBulletMove, this);
    }

    private createBlocks():void {
        this.blocks = [];
        for (var i:number = 0; i < Shield.STRUCTURE.length; i++) {
            var range:PIXI.Point = Shield.STRUCTURE[i];
            var block:PIXI.Sprite;
            for (var j:number = range.x; j < range.y; j++) {
                block = this.createBlock(j, i);
                this.addChild(block);
                this.blocks.push(block);
            }
        }
    }

    private createBlock(x:number, y:number):PIXI.Sprite {
        var block:PIXI.Sprite = Style.getSprite(Style.SHIELD);
        block.position = new PIXI.Point(x * block.width, y * block.height);
        return block;
    }

    private handlePlayerBulletMove(event:PlayerBulletEvent):void {
        var bullet:PlayerBullet = event.getBullet();
        var block:PIXI.Sprite = this.checkBlockBounds(bullet.getSprite());
        if (block) {
            block.visible = false;
            bullet.dispose();
        }
    }

    private handleEnemyBulletMove(event:EnemyBulletEvent):void {
        var bullet:EnemyBullet = event.getBullet();
        var block:PIXI.Sprite = this.checkBlockBounds(bullet.getSprite());
        if (block) {
            block.visible = false;
            bullet.dispose();
        }
    }

    private checkBlockBounds(bullet:PIXI.Sprite):PIXI.Sprite {
        for (var i:number = 0; i < this.blocks.length; i++) {
            var block:PIXI.Sprite = this.blocks[i];
            if (block.visible && GraphicsUtil.isInBounds(block, bullet)) {
                return block;
            }
        }
        return null;
    }
}