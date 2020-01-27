class AbstractView extends PIXI.Container {

    protected renderer: AbstractRenderer;
    protected eventBus: EventBus;
    protected model: GameModel;

    constructor(model: GameModel) {
        super();
        this.model = model;
        this.create();
        this.addEventListeners();
    }

    public create(): void {
        this.createEventBus();
        this.createRenderer();
    }

    private createRenderer(): void {
        this.renderer = AbstractRenderer.getInstance();
    }

    private createEventBus(): void {
        this.eventBus = EventBus.getInstance();
    }

    public listenGame(type: string, handler: Function, scope: Object): void {
        this.eventBus.addEventListener(type, handler, scope);
    }

    public removeGame(type: string, scope: Object): void {
        this.eventBus.removeEventListener(type, scope);
    }

    public dispatchGame(event: EventObject): void {
        this.eventBus.dispatchEvent(event);
    }

    public addEventListeners(): void {
    }

    public removeEventListeners(): void {
    }
}