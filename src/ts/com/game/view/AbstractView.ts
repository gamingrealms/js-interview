class AbstractView extends PIXI.Container {

    protected renderer:AbstractRenderer;
    protected eventBus:EventBus;

    constructor() {
        super();
        this.create();
        this.addEventListeners();
    }

    public create():void {
        this.createEventBus();
        this.createRenderer();
    }

    private createRenderer():void {
        this.renderer = AbstractRenderer.getInstance();
    }

    private createEventBus():void {
        this.eventBus = EventBus.getInstance();
    }

    public listen(type:string, handler:Function, scope:Object):void {
        this.eventBus.addEventListener(type, handler, scope);
    }

    public remove(type:string, scope:Object):void {
        this.eventBus.removeEventListener(type, scope);
    }

    public dispatch(event:EventObject):void {
        this.eventBus.dispatchEvent(event);
    }

    public addEventListeners():void {
    }

    public removeEventListeners():void {
    }
}