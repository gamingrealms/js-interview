class ConfigData {

    private document:Document;
    private numShields:number;
    private numEnemies:number;
    private numLives:number;
    private enemySpeed:number;

    private files:Dictionary<string, FilePath>;

    constructor(document:Document) {
        this.document = document;
        this.numShields = parseInt($(document).find("NumShields").text());
        this.numEnemies = parseInt($(document).find("NumEnemies").text());
        this.numLives = parseInt($(document).find("NumLives").text());
        this.enemySpeed = parseInt($(document).find("EnemySpeed").text());
        this.processFiles();
    }

    private processFiles() {
        this.files = new Dictionary<string, FilePath>();
        var fileQuery:JQuery = $(this.document).find("Files");
        var files:JQuery = fileQuery.children();
        files.each(ObjectUtil.delegate(this.processFile, this));
    }

    private processFile(index:any, element:Element):void {
        var type:string = element.nodeName;
        var id:string = element.getAttribute("id");
        var filePath:FilePath = ObjectUtil.reflect(window, type + FilePath.PREFIX, element);
        this.files.setValue(id, filePath);
    }

    public getNumEnemies():number {
        return this.numEnemies;
    }

    public getEnemySpeed():number {
        return this.enemySpeed;
    }

    public getNumLives():number {
        return this.numLives;
    }

    public getNumShields():number {
        return this.numShields;
    }

    public getFiles():Dictionary<string, FilePath> {
        return this.files;
    }
}