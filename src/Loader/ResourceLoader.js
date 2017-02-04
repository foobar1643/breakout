/* @flow */
import Item from '../Entity/Item';
import Platform from '../Entity/Platform';
import Ball from '../Entity/Ball';
import BallMovementProxy from '../Proxy/BallMovementProxy';
import PlatformMovementProxy from '../Proxy/PlatformMovementProxy';

export default class ResourceLoader {

    _items: Array<typeof Item> // Store items in associative array (object)
    _platformProxy: PlatformMovementProxy;

    constructor() {
        this._items = [];
    }

    _loadItems() {
        let platform = new Platform(180, 20);
        let ball = new Ball();
        ball.bindToPlatform(platform);
        this._items.push(platform, ball);
    }

    itemsLoaded() {
        return (this._items.length !== 0);
    }

    reloadItems() {

    }

    getItems() {
        if(this.itemsLoaded() === false) {
            this._loadItems();
        }

        return this._items;
    }

    getPlatformProxy() {
        if(this.itemsLoaded() === false) {
            throw new ReferenceError('Could not load platform movement proxy, load the platform first.');
        }

        if(this._platformProxy !== undefined) {
            return this._platformProxy;
        }

        let ballProxy = new BallMovementProxy(this._items[1]);
        this._platformProxy = new PlatformMovementProxy(this._items[0], ballProxy);
        return this._platformProxy;
    }

}