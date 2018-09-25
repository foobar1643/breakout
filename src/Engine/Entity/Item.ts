import ICoordinatesMap from "../Map/ICoordinatesMap";
import IDirectionMap from "../Map/IDirectionMap";
import ISizeMap from "../Map/ISizeMap";
import ISpeedMap from "../Map/ISpeedMap";
import {Directions} from "./Directions";
import {Shapes} from "./Shapes";

export default class Item {

    private readonly itemColor: string;
    private readonly itemShape: Shapes;
    private position: ICoordinatesMap;
    private size: ISizeMap;
    private speed: ISpeedMap;
    private direction: IDirectionMap;
    private readonly drawStroke: boolean;

    constructor(
        color: string,
        shape: Shapes,
        position: ICoordinatesMap,
        size: ISizeMap,
        speed: ISpeedMap,
        direction: IDirectionMap,
        stroke: boolean = true,
    ) {
        this.itemColor = color;
        this.itemShape = shape;
        this.position = position;
        this.size = size;
        this.speed = speed;
        this.direction = direction;
        this.drawStroke = stroke;
    }

    get color(): string { return this.itemColor; }
    get shape(): Shapes { return this.itemShape; }

    get x(): number { return this.position.x; }
    set x(x: number) { this.position.x = x; }
    get y(): number { return this.position.y; }
    set y(y: number) { this.position.y = y; }

    get width(): number { return this.size.width; }
    set width(width: number) { this.size.width = width; }
    get height(): number { return this.size.height; }
    set height(height: number) { this.size.height = height; }

    get hSpeed(): number { return this.speed.horizontal; }
    set hSpeed(speed: number) { this.speed.horizontal = speed; }
    get vSpeed(): number { return this.speed.vertical; }
    set vSpeed(speed: number) { this.speed.vertical = speed; }

    get hDirection(): number { return this.direction.horizontal; }
    set hDirection(direction: number) { this.direction.horizontal = direction; }
    get vDirection(): number { return this.direction.vertical; }
    set vDirection(direction: number) { this.direction.vertical = direction; }

    get stroke(): boolean { return this.drawStroke; }

    public nextPosition(): ICoordinatesMap {
        const xCalculator = this.getMotionCalculator(this.direction.horizontal);
        const yCalculator = this.getMotionCalculator(this.direction.vertical);

        return {
            x: xCalculator(this.x, this.hSpeed),
            y: yCalculator(this.y, this.vSpeed),
        };
    }

    protected getMotionCalculator(direction: Directions): (axis: number, speed: number) => number {
        switch (direction) {
            case Directions.UP:
            case Directions.LEFT:
                return (axis: number, speed: number): number => {
                    return axis - speed;
                };
            case Directions.DOWN:
            case Directions.RIGHT:
                return (axis: number, speed: number): number => {
                    return axis + speed;
                };
            case Directions.NONE:
                return (axis: number, speed: number): number => {
                    return axis;
                };
        }
    }
}
