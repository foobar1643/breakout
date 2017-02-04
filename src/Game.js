/* @flow */
import Item from './Entity/Item';
import * as Settings from './Settings';
import GameRender from "./Render/GameRender";
import HashMap from './Utility/HashMap';
import ResourceLoader from './Loader/ResourceLoader';
import KeyboardController from './Controller/Keyboard';

const GAME_GOING = 'going';
const GAME_PAUSED = 'paused';

class Game {

    _loader: ResourceLoader;
    _render: GameRender;
    _frameMs: number;
    _hashMap: HashMap;
    _items: Array<typeof Item>;
    _gameState: string;
    _keyboard: KeyboardController;

    constructor() {
        this._loader = new ResourceLoader();
        this._render = new GameRender();
        //this.hashMap = new HashMap();
        this._items = this._loader.getItems();
        let proxy = this._loader.getPlatformProxy();
        this._keyboard = new KeyboardController(proxy);
        this._gameState = GAME_GOING;
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(time: number) {
        if(this._gameState === GAME_GOING) {
            // Clear every bucket in the spatial hash map
            //this.hashMap.clearBuckets();
            // Add game items to the spatial hash map
            //this.hashMap.addItems(this.items);
            // Move items
            //this.moveActive();
            // Prepare the screen for rendering game items
            this._render.prepareScreen();
            // Render game items on the screen
            this._render.renderItems(this._items);
        }

        // Iterate game loop
        if(time < this._frameMs + (1000 / Settings.MAX_FPS)) {
            window.requestAnimationFrame(this.gameLoop.bind(this));
            return;
        }

        this._frameMs = time;
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

}

var g = new Game();