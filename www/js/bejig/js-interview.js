var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameOverEvent = (function (_super) {
    __extends(GameOverEvent, _super);
    function GameOverEvent(type) {
        return _super.call(this, type) || this;
    }
    GameOverEvent.WIN = "GameOverEvent.WIN";
    GameOverEvent.LOSE = "GameOverEvent.LOSE";
    return GameOverEvent;
}(EventObject));
var PlayerLivesUpdatedEvent = (function (_super) {
    __extends(PlayerLivesUpdatedEvent, _super);
    function PlayerLivesUpdatedEvent() {
        return _super.call(this, PlayerLivesUpdatedEvent.UPDATED) || this;
    }
    PlayerLivesUpdatedEvent.UPDATED = "PlayerLivesUpdatedEvent.UPDATED";
    return PlayerLivesUpdatedEvent;
}(EventObject));
var PlayerScoreUpdatedEvent = (function (_super) {
    __extends(PlayerScoreUpdatedEvent, _super);
    function PlayerScoreUpdatedEvent() {
        return _super.call(this, PlayerScoreUpdatedEvent.UPDATED) || this;
    }
    PlayerScoreUpdatedEvent.UPDATED = "PlayerScoreUpdatedEvent.UPDATED";
    return PlayerScoreUpdatedEvent;
}(EventObject));
var GameController = (function () {
    function GameController(model) {
        this.model = model;
        this.create();
        this.addEventListeners();
    }
    GameController.prototype.create = function () {
        this.createEventBus();
    };
    GameController.prototype.createEventBus = function () {
        this.eventBus = EventBus.getInstance();
    };
    GameController.prototype.addEventListeners = function () {
        this.listen(EnemyShipEvent.DEAD, this.handleEnemyShipDead, this);
        this.listen(PlayerShipEvent.DEAD, this.handlePlayerShipDead, this);
    };
    GameController.prototype.handleEnemyShipDead = function (event) {
        this.model.enemyShipDead();
        this.model.updateScore(1);
        this.dispatchEvent(new PlayerScoreUpdatedEvent());
        if (this.model.getEnemiesLeft() == 0) {
            this.dispatchEvent(new GameOverEvent(GameOverEvent.WIN));
        }
    };
    GameController.prototype.handlePlayerShipDead = function (event) {
        this.model.playerShipDead();
        this.dispatchEvent(new PlayerLivesUpdatedEvent());
        if (this.model.getNumLives() == 0) {
            this.dispatchEvent(new GameOverEvent(GameOverEvent.LOSE));
        }
    };
    GameController.prototype.listen = function (type, handler, scope) {
        this.eventBus.addEventListener(type, handler, scope);
    };
    GameController.prototype.remove = function (type, scope) {
        this.eventBus.removeEventListener(type, scope);
    };
    GameController.prototype.dispatchEvent = function (event) {
        this.eventBus.dispatchEvent(event);
    };
    return GameController;
}());
var Game = (function () {
    function Game() {
        this.createRenderer();
        this.createLoader();
    }
    Game.prototype.createRenderer = function () {
        this.renderer = AbstractRenderer.getInstance().initialise(new PIXI.Point(300, 350));
    };
    Game.prototype.createLoader = function () {
        this.loader = new Loader("xml/Config.xml");
        this.loader.addEventListener(EventType.COMPLETE, this.handleLoadComplete, this);
        this.loader.load();
    };
    Game.prototype.createModel = function () {
        this.model = new GameModel(this.loader.getConfig());
    };
    Game.prototype.createController = function () {
        this.controller = new GameController(this.model);
    };
    Game.prototype.createView = function () {
        this.view = new GameView(this.model);
        this.renderer.addChild(this.view);
    };
    Game.prototype.handleLoadComplete = function () {
        this.createModel();
        this.createController();
        this.createView();
    };
    return Game;
}());
var GameModel = (function () {
    function GameModel(config) {
        this.config = config;
        this.reset();
    }
    GameModel.prototype.reset = function () {
        this.numEnemies = this.config.getNumEnemies();
        this.numLives = this.config.getNumLives();
        this.numShields = this.config.getNumShields();
        this.enemiesLeft = this.config.getNumEnemies();
        this.score = 0;
    };
    GameModel.prototype.enemyShipDead = function () {
        this.enemiesLeft--;
    };
    GameModel.prototype.playerShipDead = function () {
        this.numLives--;
    };
    GameModel.prototype.updateScore = function (value) {
        this.score += value;
    };
    GameModel.prototype.getEnemiesLeft = function () {
        return this.enemiesLeft;
    };
    GameModel.prototype.getScore = function () {
        return this.score;
    };
    GameModel.prototype.getNumLives = function () {
        return this.numLives;
    };
    GameModel.prototype.getNumEnemies = function () {
        return this.numEnemies;
    };
    GameModel.prototype.getNumShields = function () {
        return this.numShields;
    };
    return GameModel;
}());
var AbstractView = (function (_super) {
    __extends(AbstractView, _super);
    function AbstractView(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.create();
        _this.addEventListeners();
        return _this;
    }
    AbstractView.prototype.create = function () {
        this.createEventBus();
        this.createRenderer();
    };
    AbstractView.prototype.createRenderer = function () {
        this.renderer = AbstractRenderer.getInstance();
    };
    AbstractView.prototype.createEventBus = function () {
        this.eventBus = EventBus.getInstance();
    };
    AbstractView.prototype.listen = function (type, handler, scope) {
        this.eventBus.addEventListener(type, handler, scope);
    };
    AbstractView.prototype.remove = function (type, scope) {
        this.eventBus.removeEventListener(type, scope);
    };
    AbstractView.prototype.dispatch = function (event) {
        this.eventBus.dispatchEvent(event);
    };
    AbstractView.prototype.addEventListeners = function () {
    };
    AbstractView.prototype.removeEventListeners = function () {
    };
    return AbstractView;
}(PIXI.Container));
var EnemyBullet = (function (_super) {
    __extends(EnemyBullet, _super);
    function EnemyBullet(model, position) {
        var _this = _super.call(this, model) || this;
        _this.sprite.position = position;
        return _this;
    }
    EnemyBullet.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createBullet();
    };
    EnemyBullet.prototype.dispose = function () {
        if (this.parent) {
            this.renderer.removeChild(this);
        }
    };
    EnemyBullet.prototype.createBullet = function () {
        this.sprite = AssetManager.getSprite(AssetManager.ENEMY_BULLET);
        this.addChild(this.sprite);
    };
    EnemyBullet.prototype.fire = function () {
        this.renderer.addChild(this);
        this.tween = TweenMax.to(this.sprite.position, 1, {
            y: this.renderer.getGameSize().y,
            ease: Linear.easeNone,
            onUpdate: ObjectUtil.delegate(this.handleTweenUpdate, this),
            onComplete: ObjectUtil.delegate(this.handleTweenComplete, this)
        });
    };
    EnemyBullet.prototype.handleTweenUpdate = function () {
        this.dispatch(new EnemyBulletEvent(this));
    };
    EnemyBullet.prototype.handleTweenComplete = function () {
        this.dispose();
    };
    EnemyBullet.prototype.getSprite = function () {
        return this.sprite;
    };
    return EnemyBullet;
}(AbstractView));
var EnemyShip = (function (_super) {
    __extends(EnemyShip, _super);
    function EnemyShip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyShip.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createShip();
        this.createTweens();
        this.startMoveTimer();
        this.startFireTimer();
    };
    EnemyShip.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.moveTimer.removeEventListener(TimerEvent.TIMER, this);
        this.fireTimer.removeEventListener(TimerEvent.TIMER, this);
        this.remove(PlayerBulletEvent.MOVE, this);
        this.dispatch(new EnemyShipEvent());
    };
    EnemyShip.prototype.addEventListeners = function () {
        this.listen(PlayerBulletEvent.MOVE, this.handlePlayerBullet, this);
    };
    EnemyShip.prototype.createShip = function () {
        this.ship = AssetManager.getMovieClip(AssetManager.ENEMY_SHIP);
        this.ship.play();
        this.addChild(this.ship);
    };
    EnemyShip.prototype.createTweens = function () {
        this.tweens = new Dictionary();
    };
    EnemyShip.prototype.startMoveTimer = function () {
        this.moveTimer = new Timer(1000);
        this.moveTimer.addEventListener(TimerEvent.TIMER, this.handleMoveTimerUpdate, this);
        this.moveTimer.start();
    };
    EnemyShip.prototype.startFireTimer = function () {
        this.fireTimer = new Timer(1500);
        this.fireTimer.addEventListener(TimerEvent.TIMER, this.handleFireTimeUpdate, this);
        this.fireTimer.start();
    };
    EnemyShip.prototype.handleMoveTimerUpdate = function (event) {
        this.move(this.randomPoint);
    };
    EnemyShip.prototype.handleFireTimeUpdate = function (event) {
        new EnemyBullet(this.model, this.ship.position.clone()).fire();
    };
    EnemyShip.prototype.handlePlayerBullet = function (event) {
        if (BoundsUtil.isInBounds(this.ship, event.getBullet().getSprite())) {
            this.dispose();
        }
    };
    EnemyShip.prototype.move = function (point) {
        this.tweens.setValue("x", TweenMax.to(this.ship.position, 1, { "x": point.x, ease: Linear.easeIn }));
        this.tweens.setValue("y", TweenMax.to(this.ship.position, 1, { "y": point.y, ease: Linear.easeIn }));
    };
    Object.defineProperty(EnemyShip.prototype, "randomPoint", {
        get: function () {
            var x = Math.random() * (this.renderer.getGameSize().x - this.ship.width);
            var y = Math.random() * (this.renderer.getGameSize().y - this.ship.height - 150);
            return new PIXI.Point(x, y);
        },
        enumerable: true,
        configurable: true
    });
    return EnemyShip;
}(AbstractView));
var PlayerBullet = (function (_super) {
    __extends(PlayerBullet, _super);
    function PlayerBullet(model, position) {
        var _this = _super.call(this, model) || this;
        _this.sprite.position = position;
        return _this;
    }
    PlayerBullet.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createBullet();
    };
    PlayerBullet.prototype.dispose = function () {
        if (this.parent) {
            this.renderer.removeChild(this);
        }
    };
    PlayerBullet.prototype.createBullet = function () {
        this.sprite = AssetManager.getSprite(AssetManager.PLAYER_BULLET);
        this.addChild(this.sprite);
    };
    PlayerBullet.prototype.fire = function () {
        this.renderer.addChild(this);
        this.tween = TweenMax.to(this.sprite.position, 1, {
            y: 0,
            ease: Linear.easeNone,
            onUpdate: ObjectUtil.delegate(this.handleTweenUpdate, this),
            onComplete: ObjectUtil.delegate(this.handleTweenComplete, this)
        });
    };
    PlayerBullet.prototype.handleTweenUpdate = function () {
        this.dispatch(new PlayerBulletEvent(this));
    };
    PlayerBullet.prototype.handleTweenComplete = function () {
        this.dispose();
    };
    PlayerBullet.prototype.getSprite = function () {
        return this.sprite;
    };
    return PlayerBullet;
}(AbstractView));
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerShip.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createShip();
    };
    PlayerShip.prototype.createShip = function () {
        this.ship = AssetManager.getSprite(AssetManager.PLAYER_SHIP);
        this.ship.interactive = true;
        this.addChild(this.ship);
        this.ship.position = new PIXI.Point(125, this.renderer.getGameSize().y - (this.renderer.getGameSize().y / 8));
    };
    PlayerShip.prototype.dispose = function () {
        if (this.ship.parent) {
            this.removeChild(this.ship);
        }
        this.removeEventListeners();
        this.dispatch(new PlayerShipEvent());
    };
    PlayerShip.prototype.addEventListeners = function () {
        var stage = this.renderer.getStage();
        MouseUtil.setInteractive(stage, true);
        MouseUtil.addMouseMove(stage, this.handleMouseMove, this);
        MouseUtil.addMouseDown(stage, this.handleMouseDown, this);
        this.listen(EnemyBulletEvent.MOVE, this.handleEnemyBulletMove, this);
    };
    PlayerShip.prototype.removeEventListeners = function () {
        var stage = this.renderer.getStage();
        MouseUtil.removeMouseMove(stage, this.handleMouseMove);
        MouseUtil.removeMouseDown(stage, this.handleMouseDown);
        this.remove(EnemyBulletEvent.MOVE, this);
    };
    PlayerShip.prototype.handleMouseDown = function () {
        var x = this.ship.position.x + (this.ship.width / 2);
        var y = this.ship.position.y;
        var bulletPosition = new PIXI.Point(x, y);
        new PlayerBullet(this.model, bulletPosition).fire();
    };
    PlayerShip.prototype.handleMouseMove = function (event) {
        var data = event.data;
        this.ship.position = new PIXI.Point(data.global.x, this.ship.position.y);
    };
    PlayerShip.prototype.handleEnemyBulletMove = function (event) {
        if (BoundsUtil.isInBounds(this.ship, event.getBullet().getSprite())) {
            this.dispose();
        }
    };
    PlayerShip.prototype.revive = function () {
        var stage = this.renderer.getStage();
        MouseUtil.setInteractive(stage, true);
        MouseUtil.addMouseMove(stage, this.handleMouseMove, this);
        MouseUtil.addMouseDown(stage, this.handleMouseDown, this);
        this.startFlashTimer();
        this.addChild(this.ship);
    };
    PlayerShip.prototype.startFlashTimer = function () {
        var flashTimer = new Timer(300, 5);
        flashTimer.addEventListener(TimerEvent.TIMER, this.handleFlashTimerUpdate, this);
        flashTimer.addEventListener(TimerEvent.COMPLETE, this.handleFlashTimerComplete, this);
        flashTimer.start();
    };
    PlayerShip.prototype.handleFlashTimerUpdate = function (event) {
        this.ship.visible = !this.ship.visible;
    };
    PlayerShip.prototype.handleFlashTimerComplete = function (event) {
        this.ship.visible = true;
        this.listen(EnemyBulletEvent.MOVE, this.handleEnemyBulletMove, this);
    };
    return PlayerShip;
}(AbstractView));
var Shield = (function (_super) {
    __extends(Shield, _super);
    function Shield() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shield.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createBlocks();
    };
    Shield.prototype.addEventListeners = function () {
        this.listen(PlayerBulletEvent.MOVE, this.handlePlayerBulletMove, this);
        this.listen(EnemyBulletEvent.MOVE, this.handleEnemyBulletMove, this);
    };
    Shield.prototype.createBlocks = function () {
        this.blocks = [];
        for (var i = 0; i < Shield.STRUCTURE.length; i++) {
            var range = Shield.STRUCTURE[i];
            var block = void 0;
            for (var j = range.x; j < range.y; j++) {
                block = this.createBlock(j, i);
                this.addChild(block);
                this.blocks.push(block);
            }
        }
    };
    Shield.prototype.createBlock = function (x, y) {
        var block = AssetManager.getSprite(AssetManager.SHIELD);
        block.position = new PIXI.Point(x * block.width, y * block.height);
        return block;
    };
    Shield.prototype.handlePlayerBulletMove = function (event) {
        var bullet = event.getBullet();
        var block = this.checkBlockBounds(bullet.getSprite());
        if (block) {
            block.visible = false;
            bullet.dispose();
        }
    };
    Shield.prototype.handleEnemyBulletMove = function (event) {
        var bullet = event.getBullet();
        var block = this.checkBlockBounds(bullet.getSprite());
        if (block) {
            block.visible = false;
            bullet.dispose();
        }
    };
    Shield.prototype.checkBlockBounds = function (bullet) {
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i];
            if (block.visible && BoundsUtil.isInBounds(block, bullet)) {
                return block;
            }
        }
        return null;
    };
    Shield.STRUCTURE = [new PIXI.Point(0, 10), new PIXI.Point(1, 9), new PIXI.Point(2, 8)];
    return Shield;
}(AbstractView));
var EnemyBulletEvent = (function (_super) {
    __extends(EnemyBulletEvent, _super);
    function EnemyBulletEvent(data) {
        var _this = _super.call(this, EnemyBulletEvent.MOVE) || this;
        _this.bullet = data;
        return _this;
    }
    EnemyBulletEvent.prototype.getBullet = function () {
        return this.bullet;
    };
    EnemyBulletEvent.MOVE = 'EnemyBulletEvent.MOVE';
    return EnemyBulletEvent;
}(EventObject));
var EnemyShipEvent = (function (_super) {
    __extends(EnemyShipEvent, _super);
    function EnemyShipEvent() {
        return _super.call(this, EnemyShipEvent.DEAD) || this;
    }
    EnemyShipEvent.DEAD = 'EnemyShipEvent.DEAD';
    return EnemyShipEvent;
}(EventObject));
var PlayerBulletEvent = (function (_super) {
    __extends(PlayerBulletEvent, _super);
    function PlayerBulletEvent(data) {
        var _this = _super.call(this, PlayerBulletEvent.MOVE) || this;
        _this.bullet = data;
        return _this;
    }
    PlayerBulletEvent.prototype.getBullet = function () {
        return this.bullet;
    };
    PlayerBulletEvent.MOVE = 'PlayerBulletEvent.MOVE';
    return PlayerBulletEvent;
}(EventObject));
var PlayerShipEvent = (function (_super) {
    __extends(PlayerShipEvent, _super);
    function PlayerShipEvent() {
        return _super.call(this, PlayerShipEvent.DEAD) || this;
    }
    PlayerShipEvent.DEAD = 'PlayerShipEvent.DEAD';
    return PlayerShipEvent;
}(EventObject));
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView(model) {
        return _super.call(this, model) || this;
    }
    GameView.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createBackground();
        this.createPlayerShip();
        this.createEnemyShips();
        this.createShields();
        this.createFields();
    };
    GameView.prototype.addEventListeners = function () {
        this.listen(PlayerLivesUpdatedEvent.UPDATED, this.handlePlayerLivesUpdate, this);
        this.listen(PlayerScoreUpdatedEvent.UPDATED, this.handlePlayerScoreUpdate, this);
    };
    GameView.prototype.createBackground = function () {
        this.background = GraphicsUtil.createRectangle(this.renderer.getGameSize());
        this.addChild(this.background);
    };
    GameView.prototype.createPlayerShip = function () {
        this.playerShip = new PlayerShip(this.model);
        this.addChild(this.playerShip);
    };
    GameView.prototype.createEnemyShips = function () {
        this.enemyShips = [];
        var ship;
        for (var i = 0; i < this.model.getNumEnemies(); i++) {
            ship = new EnemyShip(this.model);
            this.enemyShips.push(ship);
            this.renderer.addChild(ship);
        }
    };
    GameView.prototype.createShields = function () {
        var shieldPosition = new PIXI.Point(17, this.renderer.getGameSize().y - (this.renderer.getGameSize().y / 5));
        this.shields = [];
        var shield;
        for (var i = 0; i < this.model.getNumShields(); i++) {
            shield = new Shield(this.model);
            shield.position = shieldPosition;
            shieldPosition = new PIXI.Point(shieldPosition.x + (this.renderer.getGameSize().x / this.model.getNumShields()), shieldPosition.y);
            this.addChild(shield);
            this.shields.push(shield);
        }
    };
    GameView.prototype.createFields = function () {
        this.createScoreLabel();
        this.createScore();
        this.createLivesLabel();
        this.createLives();
        this.createGameName();
    };
    GameView.prototype.createScoreLabel = function () {
        this.scoreLabel = new PIXI.extras.BitmapText("score", { font: Font.HELVETICA, align: "right" });
        this.scoreLabel.position = new PIXI.Point(75, this.renderer.getGameSize().y - 20);
        this.addChild(this.scoreLabel);
    };
    GameView.prototype.createScore = function () {
        this.score = new PIXI.extras.BitmapText(this.model.getScore().toString(), {
            font: Font.HELVETICA,
            align: "left"
        });
        this.score.position = new PIXI.Point(115, this.renderer.getGameSize().y - 20);
        this.addChild(this.score);
    };
    GameView.prototype.createLivesLabel = function () {
        this.livesLabel = new PIXI.extras.BitmapText("lives", { font: Font.HELVETICA, align: "right" });
        this.livesLabel.position = new PIXI.Point(5, this.renderer.getGameSize().y - 20);
        this.addChild(this.livesLabel);
    };
    GameView.prototype.createLives = function () {
        this.lives = new PIXI.extras.BitmapText(this.model.getNumLives().toString(), {
            font: Font.HELVETICA,
            align: "left"
        });
        this.lives.position = new PIXI.Point(40, this.renderer.getGameSize().y - 20);
        this.addChild(this.lives);
    };
    GameView.prototype.createGameName = function () {
        this.gameName = new PIXI.extras.BitmapText("spaceinvaders", { font: Font.HELVETICA, align: "right" });
        this.gameName.position = new PIXI.Point(210, this.renderer.getGameSize().y - 20);
        this.addChild(this.gameName);
    };
    GameView.prototype.handlePlayerScoreUpdate = function (event) {
        this.score.text = this.model.getScore().toString();
    };
    GameView.prototype.handlePlayerLivesUpdate = function (event) {
        this.lives.text = this.model.getNumLives().toString();
        if (this.model.getNumLives() > 0) {
            this.playerShip.revive();
        }
    };
    return GameView;
}(AbstractView));
var Font = (function () {
    function Font() {
    }
    Font.HELVETICA = "12px Helvetica";
    return Font;
}());
var AssetManager = (function () {
    function AssetManager() {
    }
    AssetManager.addPath = function (filePath) {
        AssetManager.map[filePath.id] = filePath;
    };
    AssetManager.getPath = function (id) {
        return AssetManager.map[id];
    };
    AssetManager.getSprite = function (id) {
        var path = this.getPath(id);
        return PIXI.Sprite.fromImage(path.url);
    };
    AssetManager.getMovieClip = function (id) {
        var path = this.getPath(id);
        var textures = [];
        for (var i = 0; i < path.frames; i++) {
            var texture = PIXI.Texture.fromFrame(path.id + AssetManager.formatTexture(i));
            textures.push(texture);
        }
        return new PIXI.extras.MovieClip(textures);
    };
    AssetManager.formatTexture = function (num) {
        var r = num.toString();
        while (r.length < 4) {
            r = "0" + r;
        }
        return r;
    };
    AssetManager.PLAYER_SHIP = "PlayerShip";
    AssetManager.PLAYER_BULLET = "PlayerBullet";
    AssetManager.ENEMY_SHIP = "EnemyShip";
    AssetManager.ENEMY_BULLET = "EnemyBullet";
    AssetManager.SHIELD = "Shield";
    AssetManager.map = new Dictionary();
    return AssetManager;
}());
var BoundsUtil = (function () {
    function BoundsUtil() {
    }
    BoundsUtil.isInBounds = function (a, b) {
        var aPoint = GraphicsUtil.globalPosition(a);
        var bPoint = GraphicsUtil.globalPosition(b);
        var rectangle = new PIXI.Rectangle(aPoint.x, aPoint.y);
        return rectangle.contains(bPoint.x, bPoint.y);
    };
    BoundsUtil.globalPosition = function (object) {
        return new PIXI.Point(object.worldTransform.tx, object.worldTransform.ty);
    };
    return BoundsUtil;
}());
var ConfigData = (function () {
    function ConfigData(document) {
        this.document = document;
        this.numShields = parseInt($(document).find("NumShields").text());
        this.numEnemies = parseInt($(document).find("NumEnemies").text());
        this.numLives = parseInt($(document).find("NumLives").text());
        this.enemySpeed = parseInt($(document).find("EnemySpeed").text());
        this.processFiles();
    }
    ConfigData.prototype.processFiles = function () {
        this.files = new Dictionary();
        var fileQuery = $(this.document).find("Files");
        var files = fileQuery.children();
        files.each(ObjectUtil.delegate(this.processFile, this));
    };
    ConfigData.prototype.processFile = function (index, element) {
        var type = element.nodeName;
        var id = element.getAttribute("id");
        var filePath = ObjectUtil.reflect(window, type + FilePath.PREFIX, element);
        this.files.setValue(id, filePath);
    };
    ConfigData.prototype.getNumEnemies = function () {
        return this.numEnemies;
    };
    ConfigData.prototype.getEnemySpeed = function () {
        return this.enemySpeed;
    };
    ConfigData.prototype.getNumLives = function () {
        return this.numLives;
    };
    ConfigData.prototype.getNumShields = function () {
        return this.numShields;
    };
    ConfigData.prototype.getFiles = function () {
        return this.files;
    };
    return ConfigData;
}());
var Loader = (function (_super) {
    __extends(Loader, _super);
    function Loader(url) {
        var _this = _super.call(this) || this;
        _this.url = url;
        return _this;
    }
    Loader.prototype.load = function () {
        var request = new ConfigRequest(this.url);
        request.addEventListener(EventType.COMPLETE, this.handleConfigComplete, this);
        request.load();
    };
    Loader.prototype.handleConfigComplete = function (event) {
        var request = event.currentTarget;
        this.config = request.getConfig();
        var files = request.getConfig().getFiles();
        var values = files.getValues();
        var filesToLoad = [];
        var filePath;
        for (var i = 0; i < values.length; i++) {
            filePath = values[i];
            filesToLoad.push(filePath.url);
            AssetManager.addPath(filePath);
        }
        this.loader = new PIXI.loaders.Loader();
        this.loader.add(filesToLoad);
        this.loader.once("complete", ObjectUtil.delegate(this.handleFilesComplete, this));
        this.loader.load();
    };
    Loader.prototype.handleFilesComplete = function () {
        this.dispatchEvent(new EventObject(EventType.COMPLETE));
    };
    Loader.prototype.getConfig = function () {
        return this.config;
    };
    return Loader;
}(EventDispatcher));
var ConfigRequest = (function (_super) {
    __extends(ConfigRequest, _super);
    function ConfigRequest(url) {
        var _this = _super.call(this) || this;
        _this.url = url;
        return _this;
    }
    ConfigRequest.prototype.load = function () {
        $.get(this.url, null, ObjectUtil.delegate(this.handleConfigComplete, this), "xml");
    };
    ConfigRequest.prototype.handleConfigComplete = function (document) {
        this.config = new ConfigData(document);
        this.dispatchEvent(new EventObject(EventType.COMPLETE, this));
    };
    ConfigRequest.prototype.getConfig = function () {
        return this.config;
    };
    return ConfigRequest;
}(EventDispatcher));
