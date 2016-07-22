class Loader extends EventDispatcher {

    private url:string;
    private config:ConfigData;
    private loader:PIXI.loaders.Loader;

    constructor(url:string) {
        super();
        this.url = url;
    }

    public load():void {
        var request:ConfigRequest = new ConfigRequest(this.url);
        request.addEventListener(EventType.COMPLETE, this.handleConfigComplete, this);
        request.load();
    }

    private handleConfigComplete(event:EventObject) {
        var request:ConfigRequest = event.currentTarget;
        this.config = request.getConfig();
        var files:Dictionary<string, FilePath> = request.getConfig().getFiles();
        var values:FilePath [] = files.getValues();
        var filesToLoad:string [] = [];
        var filePath:FilePath;
        for (var i:number = 0; i < values.length; i++) {
            filePath = values[i];
            filesToLoad.push(filePath.url);
            Style.addPath(filePath);
        }
        //this.loader = new PIXI.AssetLoader(filesToLoad);
        //this.loader.onComplete = ObjectUtil.delegate(this.handleFilesComplete, this);
        //this.loader.load();
        this.loader = new PIXI.loaders.Loader();
        this.loader.add(filesToLoad);
        this.loader.once("complete", ObjectUtil.delegate(this.handleFilesComplete, this));
        this.loader.load();
    }

    private handleFilesComplete() {
        this.dispatchEvent(new EventObject(EventType.COMPLETE));
    }

    public getConfig() {
        return this.config;
    }
}