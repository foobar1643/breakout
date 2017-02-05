export default class CollisionManager {

    _object: Item;
    _hashMap: HashMap;

    constructor(object, hashMap) {
        this._object = object;
        this._hashMap = hashMap;
    }

    collision(hDirection, vDirection) {
        let xMathOperation = this._object.movingMathOperation(hDirection);
        let yMathOperation = this._object.movingMathOperation(vDirection);

        let x = xMathOperation(this._object.x, this._object.hSpeed);
        let y = yMathOperation(this._object.y, this._object.vSpeed);

        let nearby = this._hashMap.getNearbyItems(this._object);

        for(let item of nearby) {
            if (x < item.x + item.width &&
                x + this._object.width > item.x &&
                y < item.y + item.height &&
                this._object.height + y > item.y) {
                    return true;
            }
        }
        return false;
    }

}