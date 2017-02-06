/* @flow */
import * as Settings from '../Settings';
import Item from '../Entity/Item';
import Platform from '../Entity/Platform';
import Ball from '../Entity/Ball';
import ProxyBall from '../Proxy/ProxyBall';
import ProxyPlatform from '../Proxy/ProxyPlatform';
import HashMap from '../Utility/HashMap';

export default class ResourceLoader {

    _items: Array<typeof Item> // Store items in associative array (object)
    _active: Array<any>; // This should be proxies only
    _platformProxy: ProxyPlatform;
    _proxyBall: ProxyBall;
    _hashMap: HashMap;

    constructor() {
        this._items = [];
    }

    _loadItems() {
        let platform = new Platform(180, 20);
        let ball = new Ball();
        ball.bindToPlatform(platform);
        this._items.push(platform, ball);
        this._loadFieldCollision();
    }

    _loadFieldCollision() {
        let up = new Item('rectangle', 'red', [0, 0], [Settings.SCREEN_WIDTH, 1], [0, 0], false);
        let down = new Item('rectangle', 'red', [1,  Settings.SCREEN_HEIGHT - 1], [Settings.SCREEN_WIDTH, 1], [0, 0], false);
        let left = new Item('rectangle', 'red', [0, 0], [1, Settings.SCREEN_HEIGHT], [0, 0], false);
        let right = new Item('rectangle', 'red', [Settings.SCREEN_WIDTH - 1, 0], [1, Settings.SCREEN_HEIGHT], [0, 0], false);
        this._items.push(up, down, left, right);
    }

    itemsLoaded() {
        return (this._items.length !== 0);
    }

    reloadItems() {

    }

    hashMapLoaded() {
        return (this._hashMap !== undefined);
    }

    loadHashMap() {
        if(this.itemsLoaded() === false) {
            throw new ReferenceError('Could not load hash map, load the items first.');
        }

        this._hashMap = new HashMap();
        this._hashMap.addItems(this._items);
        return this._hashMap;
    }

    getItems() {
        if(this.itemsLoaded() === false) {
            this._loadItems();
        }

        return this._items;
    }

    _loadProxyBall() {
        if(this._proxyBall === undefined) {
            console.log('created proxy ball');
            this._proxyBall = new ProxyBall(this._items[1], this._hashMap);
        }
        return this._proxyBall;
    }

    getActiveItems(hashMap: any) {
        if(this.itemsLoaded() === false) {
            throw new ReferenceError('Could not get active items, load the items frist.');
        }
        return [this._loadProxyBall()];
    }

    getPlatformProxy() {
        if(this.itemsLoaded() === false && this.hashMapLoaded()) {
            throw new ReferenceError('Could not load platform movement proxy, platform entity and hash map should be loaded first.');
        }

        if(this._platformProxy !== undefined) {
            return this._platformProxy;
        }

        let ballProxy = this._loadProxyBall();
        this._platformProxy = new ProxyPlatform(this._items[0], ballProxy, this._hashMap);
        return this._platformProxy;
    }

}