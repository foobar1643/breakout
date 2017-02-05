/* @flow */
import * as Settings from '../Settings';
import Item from '../Entity/Item';

export const CELL_SIZE = 50;

export default class HashMap {

    _cols: number;
    _rows: number;
    _cleanBuckets: Array<Array<any>>;
    _buckets: Array<Array<any>>;

    /**
     * constructor - description
     *
     * @return {type}  description
     */
    constructor() {
        this._rows = (Settings.SCREEN_HEIGHT / CELL_SIZE) + 1;
        this._cols = (Settings.SCREEN_WIDTH / CELL_SIZE) + 1;
        this._validateCellSize();
        this._buckets = this._generateCleanBuckets();
        /*this._generateCleanBuckets();
        this.clearBuckets();*/
    }

    /**
     * _validateCellSize - description
     *
     * @todo Calculate and suggest optimal cell size if an error is thrown
     *
     * @return {type}  description
     */
    _validateCellSize(): boolean {

        if(!Number.isInteger(this._rows) || !Number.isInteger(this._cols)) {
            throw new RangeError('Hashmap cell size is invalid for current gamefield size.');
        }
        return true;
    }

    /**
     * _generateCleanBuckets - description
     *
     * @return {type}  description
     */
    _generateCleanBuckets() {
        return Array.from(
            {length: this._rows},
                () => Array.from({length: this._cols}, () => [])
        );
    }

    /**
     * _hashItem - description
     *
     * @todo Think about using methods like getHitBoxStart() and getHitBoxEnd()
     * for getting collision box boundries
     *
     * @param  {type} item description
     * @return {type}      description
     */
    _hashItem(item: typeof Item) {
        var start = this.hash(item.x, item.y);
        var end = this.hash(item.x + item.width, item.y + item.height);

        return { "start": start, "end": end};
    }

    /**
     * _getBucketsForItem - description
     *
     * @param  {type} item: Item description
     * @return {type}            description
     */
    _getBucketIds(item: Item) {
        let hash = this._hashItem(item);
        let buckets = [];
        for(var y = hash["start"]["y"]; y < hash["end"]["y"] + 1; y++) {
            for(var x = hash["start"]["x"]; x < hash["end"]["x"] + 1; x++) {
                buckets.push({"x": x, "y": y});
            }
        }
        return buckets;
    }

    /**
     * Optimization step, so we don't have to run a cleaning loop every update.
     * As a downside to this optimization, we can't dynamicly recreate hash map if,
     * for example, screen height or width changes.
     *
     * @todo Run a few tests to see if returning empty array is going to break anything
     *
     * @return {type}  description
     */
    clearBuckets() {
        this._buckets = this._generateCleanBuckets();
    }

    /**
     * addItems - description
     *
     * @param  {type} items description
     * @return {type}       description
     */
    addItems(items: Array<typeof Item>) {
        for(let item of items) {
            this.addItem(item);
        }
    }

    /**
     * addItem - description
     *
     * @param  {type} item description
     * @return {type}      description
     */
    addItem(item: Item) {
        var buckets = this._getBucketIds(item);
        for(let bucket of buckets) {
            //console.log("Y: %f, X: %f", bucket.y, bucket.x);
            this._buckets[bucket.y][bucket.x].push(item);
        }
    }

    /**
     * getNearbyItems - description
     *
     * @param  {type} item: Item description
     * @return {type}            description
     */
    getNearbyItems(item: Item) {
        var buckets = this._getBucketIds(item);
        var nearby = [];
        for(let bucket of buckets) {
            for(let storedItem of this._buckets[bucket.y][bucket.x]) {
                if(item !== storedItem && nearby.indexOf(storedItem) === -1) {
                    nearby.push(storedItem);
                }
            }
        }
        return nearby;
    }

    /**
     * hash - description
     *
     * @param  {type} x description
     * @param  {type} y description
     * @return {type}   description
     */
    hash(x: number, y: number) {
        return { "x": Math.floor(x / CELL_SIZE), "y": Math.floor(y / CELL_SIZE)};
    }
}