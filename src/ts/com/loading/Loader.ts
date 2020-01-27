class Loader extends EventDispatcher {

    private url:string;
    private config:ConfigData;
    private loader:PIXI.loaders.Loader;

    constructor(url:string) {
        super();
        this.url = url;
    }

    public load():void {
        let request:ConfigRequest = new ConfigRequest(this.url);
        request.addEventListener(EventType.COMPLETE, this.handleConfigComplete, this);
        request.load();
    }

    private handleConfigComplete(event:EventObject) {
        let request:ConfigRequest = event.currentTarget;
        this.config = request.getConfig();
        let files:Dictionary<string, FilePath> = request.getConfig().getFiles();
        let values:FilePath [] = files.getValues();
        let filesToLoad:string [] = [];
        let filePath:FilePath;
        for (let i:number = 0; i < values.length; i++) {
            filePath = values[i];
            filesToLoad.push(filePath.url);
            AssetManager.addPath(filePath);
        }
        this.loader = new PIXI.loaders.Loader();
        this.loader.add(filesToLoad);
        this.loader.once("complete", this.handleFilesComplete.bind(this));
        this.loader.load();
    }

    private handleFilesComplete() {
        this.dispatchEvent(new EventObject(EventType.COMPLETE));
    }

    public getConfig() {
        return this.config;
    }
}