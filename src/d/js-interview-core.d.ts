/// <reference path="../../src/d/jquery.d.ts" />
/// <reference path="../../src/d/pixi.d.ts" />
/// <reference path="../../src/d/greensock.d.ts" />
declare class Dictionary<Key, Value> {
    private keys;
    private values;
    constructor();
    clear(): void;
    containsKey(key: Key): boolean;
    setValue(key: Key, value: Value): void;
    getValue(key: Key): any;
    remove(key: Key): void;
    size(): number;
    getKeys(): Key[];
    getValues(): Value[];
    private keyIndex(key);
    private addElement(key, value);
    private removeElement(key);
    private updateElement(index, value);
}
declare class EventBus {
    private static instance;
    private eventDispatcher;
    constructor();
    addEventListener(type: string, handler: Function, scope: Object): void;
    removeEventListener(type: string, scope: Object): void;
    dispatchEvent(event: EventObject): void;
    static getInstance(): EventBus;
}
declare class EventDispatcher {
    private eventHandlers;
    constructor();
    addEventListener(type: string, handler: Function, scope: Object): void;
    removeAllListeners(): void;
    removeEventListener(type: string, scope: Object): void;
    dispatchEvent(event: EventObject): void;
}
declare class EventObject {
    private _type;
    private _currentTarget;
    constructor(type: string, currentTarget?: any);
    type: string;
    currentTarget: any;
}
declare class EventType {
    static COMPLETE: string;
}
declare class GraphicsUtil {
    static isInBounds(a: PIXI.Sprite, b: PIXI.Sprite): boolean;
    static globalPosition(object: PIXI.Sprite): PIXI.Point;
    static createRectangle(size: PIXI.Point, color?: number, alpha?: number): PIXI.Graphics;
}
declare class FilePath {
    static PREFIX: string;
    private _type;
    private _url;
    private _id;
    constructor(element: Element);
    type: string;
    url: string;
    id: string;
}
declare class FontFilePath extends FilePath {
    constructor(element: Element);
}
declare class PNGFilePath extends FilePath {
    constructor(element: Element);
}
declare class SpriteSheetFilePath extends FilePath {
    private _frames;
    constructor(element: Element);
    frames: number;
}
declare class Logger {
    static debug(message: String): void;
    static warn(message: String): void;
    static error(message: String): void;
}
declare class ObjectUtil {
    static delegate(method: Function, scope: Object): any;
    static reflect(context: Object, name: string, ...args: any[]): any;
}
declare class Timer extends EventDispatcher {
    private delay;
    private repeatCount;
    private currentCount;
    private isRunning;
    private interval;
    constructor(delay: number, repeatCount?: number);
    start(): void;
    private handleTimerUpdate();
    stop(): void;
    reset(): void;
}
declare class TimerEvent extends EventObject {
    static TIMER: string;
    static COMPLETE: string;
    constructor(type: string);
}
declare class AbstractRenderer {
    protected static instance: AbstractRenderer;
    protected properties: RendererProperties;
    protected core: EventBus;
    protected view: HTMLCanvasElement;
    protected stage: PIXI.Container;
    protected containerDOM: JQuery;
    protected renderer: PIXI.SystemRenderer;
    protected ticker: PIXI.ticker.Ticker;
    protected holder: PIXI.Container;
    protected safeTransform: PIXI.Point;
    constructor();
    initialise(size: PIXI.Point): AbstractRenderer;
    protected create(): void;
    protected setResolution(): void;
    protected setFrameRate(): void;
    protected createCore(): void;
    protected registerDocument(): void;
    protected createView(): void;
    protected createCanvas(windowSize: PIXI.Point): void;
    protected createStage(): void;
    protected createHolder(): void;
    protected createRenderer(): void;
    protected createAutoRenderer(gameSize: PIXI.Point): PIXI.SystemRenderer;
    protected createWebGLRenderer(gameSize: PIXI.Point): PIXI.WebGLRenderer;
    protected createCanvasRenderer(gameSize: PIXI.Point): PIXI.CanvasRenderer;
    protected start(): void;
    protected render(): void;
    protected dispatchCoreEvent(event: EventObject): void;
    addChild(child: PIXI.Container): void;
    removeChild(child: PIXI.Container): void;
    setAutoResize(value: boolean): void;
    getWindowSize(): PIXI.Point;
    getStage(): PIXI.Container;
    getRenderer(): PIXI.SystemRenderer;
    getView(): HTMLCanvasElement;
    getHolder(): PIXI.Container;
    getFrameRate(): number;
    getResolution(): number;
    getGameSize(): PIXI.Point;
    getTicker(): PIXI.ticker.Ticker;
    getContainerDom(): JQuery;
    static getInstance(): AbstractRenderer;
}
declare class RendererProperties implements PIXI.RendererOptions {
    size: PIXI.Point;
    autoResize: boolean;
    transparent: boolean;
    antialias: boolean;
    targetFrameRate: number;
    minFrameRate: number;
    view: HTMLCanvasElement;
    resolution: number;
    clearBeforeRender: boolean;
    preserveDrawingBuffer: boolean;
    restrictScale: boolean;
    constructor(size: PIXI.Point);
}
declare class MouseUtil {
    static setInteractive(displayObject: PIXI.DisplayObject, interactive: boolean): void;
    static addMouseDown(displayObject: PIXI.DisplayObject, handler: Function, scope: Object): void;
    static addMouseUp(displayObject: PIXI.DisplayObject, handler?: Function, scope?: Object): void;
    static addMouseOver(displayObject: PIXI.DisplayObject, handler: Function, scope: Object): void;
    static addMouseOut(displayObject: PIXI.DisplayObject, handler: Function, scope: Object): void;
    static addMouseMove(displayObject: PIXI.DisplayObject, handler: Function, scope: Object): void;
    static addMouseBlock(displayObject: PIXI.DisplayObject, clickHandler?: Function, scope?: Object): void;
    static removeMouseDown(displayObject: PIXI.DisplayObject, handler: Function): void;
    static removeMouseUp(displayObject: PIXI.DisplayObject, handler: Function): void;
    static removeMouseOver(displayObject: PIXI.DisplayObject, handler: Function): void;
    static removeMouseOut(displayObject: PIXI.DisplayObject, handler: Function): void;
    static removeMouseMove(displayObject: PIXI.DisplayObject, handler: Function): void;
    private static handleMouseBlock(event);
}
