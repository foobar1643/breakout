export const DIRECTION_NONE = 'none';
export const DIRECTION_UP = 'up';
export const DIRECTION_DOWN = 'down';
export const DIRECTION_LEFT = 'left';
export const DIRECTION_RIGHT = 'right';

export default class Item {

    _type: string;
    _color: string;
    _position: [number, number]; // [x, y]
    _size: [number, number]; // [width, height]
    _speed: [number, number] // [horizontal, vertical]
    _direction: [string, string]
    _stroke: boolean;

    get color() { return this._color; };
    get type() { return this._type; };

    get x() { return this._position[0]; };
    set x(x: number) { this._position[0] = x; };
    get y() { return this._position[1]; };
    set y(y: number) { this._position[1] = y; };

    get width() { return this._size[0]; };
    set width(width) { this._size[0] = width; };
    get height() { return this._size[1]; };
    set height(height) { this._size[1] = height; };

    get hSpeed() { return this._speed[0]; };
    set hSpeed(speed) { this._speed[0] = speed; };
    get vSpeed() { return this._speed[1]; };
    set vSpeed(speed) { this._speed[1] = speed; };

    get hDirection() { return this._direction[0]; };
    set hDirection(direction) { this._direction[0] = direction; };
    get vDirection() { return this._direction[1]; };
    set vDirection(direction) { this._direction[1] = direction; };

    get stroke() { return this._stroke; };

    constructor(type: string, color: string, position: [number, number], size: [number, number], speed: [number, number], stroke = true) {
        this._type = type;
        this._color = color;
        this._position = position;
        this._size = size;
        this._speed = speed;
        this._direction = [DIRECTION_NONE, DIRECTION_NONE];
        this._stroke = stroke;
    }

    movingMathOperation(direction) {
        switch(direction) {
            case DIRECTION_UP:
            case DIRECTION_LEFT:
                return function(axis, speed) { return axis - speed; };
            case DIRECTION_DOWN:
            case DIRECTION_RIGHT:
                return function(axis, speed) { return axis + speed; };
            case DIRECTION_NONE:
                return function(axis, speed) { return axis; };
        }
        throw new TypeError("Can't find math operation for direction " + direction); // ES6 Template Literals?
    }

    getNextPosition() {
        let xMathOperation = this.movingMathOperation(this.hDirection);
        let yMathOperation = this.movingMathOperation(this.vDirection);
        return { "x": xMathOperation(this.x, this.hSpeed), "y": yMathOperation(this.y, this.vSpeed) };
    }

}