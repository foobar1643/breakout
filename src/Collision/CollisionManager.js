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

        let left = item.x;
        let right = item.x + item.width;

        let top = item.y;
        let bottom = item.y + item.height;

        let objPosY = position.y + this._object.height;
        let objPosX = position.x + this._object.width;

        /*if (position.x < item.x + item.width &&
            position.x + this._object.width > item.x &&
            position.y < item.y + item.height &&
            this._object.height + position.y > item.y) {
                return true;
        }*/

        if( (position.x >= item.x - this._object.width && position.x <= item.x + item.width + this._object.width) &&
            (position.y >= item.y && position.y <= item.y + item.height)) {
                return true;
        }

        return false;
    }

    _collidesV(position, item) {

        let left = item.x;
        let right = item.x + item.width;

        let top = item.y;
        let bottom = item.y + item.height;

        let objPosY = position.y + this._object.height;
        let objPosX = position.x + this._object.width;

        if( (position.y >= item.y - this._object.height && position.y <= item.y + item.height + this._object.height) &&
            (position.x >= item.x && position.x <= item.x + item.width)) {
                return true;
        }

        return false;
    }

    collision(position) {
        let nearby = this._hashMap.getNearbyItems(this._object);

        for(let item of nearby) {
            //console.log('collidesH: ' + this._collides(position, item) + ' collidesV: ' + this._collidesV(position, item));
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