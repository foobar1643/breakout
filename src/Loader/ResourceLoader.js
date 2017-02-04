/* @flow */
import Item from '../Entity/Item';
import Platform from '../Entity/Platform';
import Ball from '../Entity/Ball';

export default class ResourceLoader {

    _items: Array<typeof Item>

    constructor() {
        this._items = [];
    }

    _loadItems() {
        let platform = new Platform(180, 20);
        let ball = new Ball();
        ball.bindToPlatform(platform);
        this._items.push(platform, ball);
    }

    reloadItems() {

    }

    getItems() {
        if(this._items.length === 0) {
            this._loadItems();
        }

        return this._items;
    }

}