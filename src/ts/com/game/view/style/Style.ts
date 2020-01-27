class AssetManager {

    public static PLAYER_SHIP:string = "PlayerShip";
    public static PLAYER_BULLET:string = "PlayerBullet";
    public static ENEMY_SHIP:string = "EnemyShip";
    public static ENEMY_BULLET:string = "EnemyBullet";
    public static SHIELD:string = "Shield";

    private static map:Dictionary<string,string> = new Dictionary<string, string>();

    public static addPath(filePath:FilePath):void {
        AssetManager.map[filePath.id] = filePath;
    }

    private static getPath(id:string):FilePath {
        return AssetManager.map[id];
    }

    public static getSprite(id:string):PIXI.Sprite {
        let path:FilePath = this.getPath(id);
        return PIXI.Sprite.fromImage(path.url);
    }

    public static getMovieClip(id:string):PIXI.extras.MovieClip {
        let path:SpriteSheetFilePath = <SpriteSheetFilePath> this.getPath(id);
        let textures:Array<PIXI.Texture> = [];
        for (let i = 0; i < path.frames; i++) {
            let texture:PIXI.Texture = PIXI.Texture.fromFrame(path.id + AssetManager.formatTexture(i));
            textures.push(texture);
        }
        return new PIXI.extras.MovieClip(textures);
    }

    private static formatTexture(num:number):string {
        let r:string = num.toString();
        while (r.length < 4) {
            r = "0" + r;
        }
        return r;
    }
}