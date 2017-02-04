/* @flow */
import * as Settings from '../Settings';
import Item from '../Entity/Item';
import Render from './Render';

export default class GameRender extends Render {

    _canvas: HTMLCanvasElement;
    _context: any;

    constructor() {
        super();
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
        this._canvas.width = Settings.SCREEN_WIDTH;
        this._canvas.height = Settings.SCREEN_HEIGHT;
        this._appendCanvas();
    }

    _appendCanvas() {
        let gameContainer = document.getElementById('game-container');
        if(gameContainer != null) {
            gameContainer.appendChild(this._canvas);
            return;
        }
        throw new ReferenceError('Could not find parent element for game canvas.');
    }

    _determineRenderFunction(item: typeof Item): any {
        let renderTypes = {
            'rectangle': super._rectangle,
            'circle': super._circle
        };

        if(renderTypes[item.type] == "undefined") {
            throw new TypeError("Could not find a render function for given item type.");
        }

        return renderTypes[item.type];
    }

    prepareScreen() {
        this._context.fillStyle = 'rgb(255, 255, 255)';
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    renderItems(items: Array<typeof Item>) {
        for(let item of items) {
            let renderFunction = this._determineRenderFunction(item);
            renderFunction(item, this._context); // Find an ES6 way to bind a context
        }
    }

}