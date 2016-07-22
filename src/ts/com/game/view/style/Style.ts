class Style {

    public static PLAYER_SHIP:string = "PlayerShip";
    public static PLAYER_BULLET:string = "PlayerBullet";
    public static ENEMY_SHIP:string = "EnemyShip";
    public static ENEMY_BULLET:string = "EnemyBullet";
    public static SHIELD:string = "Shield";

    private static map:Dictionary<string,string> = new Dictionary<string, string>();

    public static addPath(filePath:FilePath):void {
        Style.map[filePath.id] = filePath;
    }

    private static getPath(id:string):FilePath {
        return Style.map[id];
    }

    public static getSprite(id:string):PIXI.Sprite {
        var path:FilePath = this.getPath(id);
        return PIXI.Sprite.fromImage(path.url);
    }

    public static getMovieClip(id:string):PIXI.extras.MovieClip {
        var path:SpriteSheetFilePath = <SpriteSheetFilePath> this.getPath(id);
        var textures:Array<PIXI.Texture> = [];
        for (var i = 0; i < path.frames; i++) {
            var texture:PIXI.Texture = PIXI.Texture.fromFrame(path.id + Style.formatTexture(i));
            textures.push(texture);
        }
        return new PIXI.extras.MovieClip(textures);
    }

    private static formatTexture(num:number):string {
        var r:string = num.toString();
        while (r.length < 4) {
            r = "0" + r;
        }
        return r;
    }
}