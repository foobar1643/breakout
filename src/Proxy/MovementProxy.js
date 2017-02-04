/* @flow */
import Item from '../Entity/Item';

export default class MovementProxy {

    _object: Item;

    constructor(object: Item) {
        this._object = object;
    }

    move(hDirection: string, vDirection: string) {
        let xMathOperation = this._object.movingMathOperation(hDirection);
        let yMathOperation = this._object.movingMathOperation(vDirection);

        console.log(xMathOperation(this._object.x, this._object.hSpeed));
        console.log(yMathOperation(this._object.y, this._object.vSpeed));

        this._object.x = xMathOperation(this._object.x, this._object.hSpeed);
        this._object.y = yMathOperation(this._object.y, this._object.vSpeed);
    }

}