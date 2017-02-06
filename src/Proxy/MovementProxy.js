/* @flow */
import Item from '../Entity/Item';

export default class MovementProxy {

    _object: Item;

    constructor(object: Item) {
        this._object = object;
    }

    move(position: any) {
        this._object.x = position.x;
        this._object.y = position.y;
    }

    setDirections(horizontal: string, vertical: string) {
        this._object.hDirection = horizontal;
        this._object.vDirection = vertical;
    }

}