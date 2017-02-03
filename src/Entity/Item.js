export default class Item {

    _type: string;
    _color: string;
    _position: [number, number]; // [x, y]
    _size: [number, number]; // [width, height]
    _speed: [number, number] // [horizontal, vertical]

    get type() { return this._type; };

    get x() { return this._position[0]; };
    set x(x: number) { this._position[0] = x; };
    get y() { return this._position[1]; };
    set y(y: number) { this._position[1] = y; };

    get width() { return this._size[0]; };
    get height() { return this._size[1]; };

    get hSpeed() { return this._speed[0]; };
    get vSpeed() { return this._speed[1]; };

    constructor(type: string, color: string, position: [number, number], size: [number, number], speed: [number, number]) {
        this._type = type;
        this._color = color;
        this._position = position;
        this._size = size;
        this._speed = speed;
    }

}