/* @flow */
import * as Settings from '../Settings';
import Item from '../Entity/Item';
import {CELL_SIZE} from '../Utility/HashMap';
import Render from './Render';

const HASHMAP_LINE_STYLE = 'blue';
const HASHMAP_LINE_SIZE = 1;

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

    _hashMapGrid() {
        if(Settings.DRAW_HASHMAP === true) {
            let x = 0, y = 0;
            // Think about optimizing this (can be done in one loop)
            for(var i = 0; i < Math.floor(this._canvas.height / CELL_SIZE) + 1; i++) { // Rows
                super._line(HASHMAP_LINE_SIZE, HASHMAP_LINE_STYLE, [0, y], [this._canvas.width, y]);
                y = y + CELL_SIZE;
            }

            for(var i = 0; i < Math.floor(this._canvas.width / CELL_SIZE) + 1; i++) { // Cols
                super._line(HASHMAP_LINE_SIZE, HASHMAP_LINE_STYLE, [x, 0], [x, this._canvas.width]);
                x = x + CELL_SIZE;
            }
        }
    }

    prepareScreen() {
        this._context.fillStyle = 'rgb(255, 255, 255)';
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._hashMapGrid();
    }

    renderItems(items: Array<typeof Item>) {
        for(let item of items) {
            let renderFunction = this._determineRenderFunction(item);
            renderFunction(item, this._context); // Find an ES6 way to bind a context
        }
    }

}