class ConfigRequest extends EventDispatcher {

    private url:string;
    private config:ConfigData;

    constructor(url:string) {
        super();
        this.url = url;
    }

    public load():void {
        $.get(this.url, null, this.handleConfigComplete.bind(this), "xml");
    }

    private handleConfigComplete(document:Document) {
        this.config = new ConfigData(document);
        this.dispatchEvent(new EventObject(EventType.COMPLETE, this));
    }

    public getConfig():ConfigData {
        return this.config;
    }
}

