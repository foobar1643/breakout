export default class CollisionManager {

    _object: Item;
    _hashMap: HashMap;

    constructor(object, hashMap) {
        this._object = object;
        this._hashMap = hashMap;

    }

    _collides(position, item) {

        if( (position.x >= item.x - this._object.width && position.x <= item.x + item.width) &&
            (position.y >= item.y && position.y <= item.y + item.height)) {
                return true;
        }

        return false;
    }

    _collidesV(position, item) {

        if( (position.y >= item.y - this._object.height && position.y <= item.y + item.height + this._object.height) &&
            (position.x >= item.x && position.x <= item.x + item.width)) {
                return true;
        }

        return false;
    }

    collision(position) {
        let nearby = this._hashMap.getNearbyItems(this._object);

        for(let item of nearby) {
            switch(true) {
                case this._collidesV(position, item):
                    return 'vertical';
                case this._collides(position, item):
                    return 'horizontal';
            }
        }
        return false;
    }

}