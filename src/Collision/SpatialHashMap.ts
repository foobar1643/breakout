import {inject, injectable} from "inversify";
import Item from "../Entity/Item";
import ICoordinatesMap from "../Map/ICoordinatesMap";
import IHitBox from "../Map/IHitBox";
import {TYPES} from "../types";

@injectable()
export default class SpatialHashMap {

    private readonly cellSize: number;
    private readonly rows: number;
    private readonly cols: number;
    private buckets: Item[][][] = [];
    private readonly clearBuckets: Item[][][];

    public constructor(
        @inject(TYPES.SpatialCellSize) cellSize: number,
        @inject(TYPES.ScreenWidth) screenWidth: number,
        @inject(TYPES.ScreenHeight) screenHeight: number,
    ) {
        this.cellSize = cellSize;
        this.rows = (screenWidth / this.cellSize) + 1;
        this.cols = (screenHeight / this.cellSize) + 1;

        if (!Number.isInteger(this.rows) || !Number.isInteger(this.cols)) {
            // TODO: Calculate and suggest optimal cell size if this error is thrown
            throw new RangeError("Spatial cell size is not valid for current screen size");
        }

        this.clearBuckets = this.getCleanBuckets();
        this.clear();
    }

    get cellProportions(): number { return this.cellSize; }
    get lines(): number { return this.rows; }
    get columns(): number { return this.cols; }

    public hasItems(row: number, column: number): boolean {
        return 0 !== this.buckets[row][column].length;
    }

    /**
     * Optimization step, so we don't have to run a cleaning loop every update.
     * A downside of this optimization is that we can't dynamically recreate
     * hash map if, for example, screen height or width changes.
     */
    public clear(): void {
        this.buckets = this.clearBuckets.slice(0);
    }

    public items(items: Item[]): void {
        for (const item of items) {
            this.add(item);
        }
    }

    public add(item: Item): void {
        const hitBox = this.hashHitBox(item.hitBox());
        const buckets = this.getBuckets(hitBox);

        for (const bucket of buckets) {
            this.buckets[bucket.y][bucket.x].push(item);
        }
    }

    public nearby(item: Item): Item[] {
        const hitBox = this.hashHitBox(item.hitBox());
        const buckets = this.getBuckets(hitBox);
        const nearby = [];
        for (const bucket of buckets) {
            for (const storedItem of this.buckets[bucket.y][bucket.x]) {
                if (item !== storedItem && nearby.indexOf(storedItem) === -1) {
                    nearby.push(storedItem);
                }
            }
        }
        return nearby;
    }

    private getCleanBuckets(): Item[][][] {
        return Array.from(
            {length: this.rows},
            () => Array.from(
                {length: this.cols},
                () => [],
            ),
        );
    }

    // noinspection JSMethodCanBeStatic
    private getBuckets(hitBox: IHitBox): ICoordinatesMap[] {
        const buckets = [];

        for (let y = hitBox.start.y; y < hitBox.end.y + 1; y++) {
            for (let x = hitBox.start.x; x < hitBox.end.x + 1; x++) {
                buckets.push({x, y});
            }
        }

        return buckets;
    }

    private hashHitBox(hitBox: IHitBox): IHitBox {
        return {
            end: {
                x: Math.floor(hitBox.end.x / this.cellSize),
                y: Math.floor(hitBox.end.y / this.cellSize),
            },
            start: {
                x: Math.floor(hitBox.start.x / this.cellSize),
                y: Math.floor(hitBox.start.y / this.cellSize),
            },
        };
    }
}
