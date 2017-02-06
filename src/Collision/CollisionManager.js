export default class CollisionManager {

    _object: Item;
    _hashMap: HashMap;

    constructor(object, hashMap) {
        this._object = object;
        this._hashMap = hashMap;

    }

    /**
     *         if((position[mainAxis] < item[mainAxis] + item[mainUnit]  && position[mainAxis] + this._object[mainUnit]  > item[mainAxis])) {
                 if((position[checkAxis] < item[checkAxis] + item[checkUnit] && position[checkAxis] + this._object[checkUnit] > item[checkAxis])) {
                     return true;
                 }
             }
     */

    _collides(position, item) {

        if (position.x < item.x + item.width &&
            position.x + this._object.width > item.x &&
            position.y < item.y + item.height &&
            this._object.height + position.y > item.y) {
                return true;
        }

        return false;
    }

    collision(position) {
        let nearby = this._hashMap.getNearbyItems(this._object);

        for(let item of nearby) {
            //console.log('collidesH: ' + this._collides(position, item) + ' collidesV: ' + this._collidesV(position, item));
            if(this._collides(position, item)) return 'vertical';
        }
        return false;
    }

}