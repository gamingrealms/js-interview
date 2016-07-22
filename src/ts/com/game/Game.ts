class Game {

    private renderer:AbstractRenderer;
    private loader:Loader;

    private model:GameModel;
    private view:GameView;
    private controller:GameController;

    constructor() {
        this.createRenderer();
        this.createLoader();
    }

    private createRenderer() {
        this.renderer = AbstractRenderer.getInstance().initialise(new PIXI.Point(300, 350))
    }

    private createLoader() {
        this.loader = new Loader("xml/Config.xml");
        this.loader.addEventListener(EventType.COMPLETE, this.handleLoadComplete, this);
        this.loader.load();
    }

    private createModel():void {
        this.model = new GameModel(this.loader.getConfig());
    }

    private createController():void {
        this.controller = new GameController(this.model);
    }

    private createView():void {
        this.view = new GameView(this.model);
        this.renderer.addChild(this.view);
    }

    private handleLoadComplete() {
        this.createModel();
        this.createController();
        this.createView();
    }
}