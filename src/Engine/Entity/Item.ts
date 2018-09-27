import ICoordinatesMap from "../Map/ICoordinatesMap";
import IDirectionMap from "../Map/IDirectionMap";
import ISizeMap from "../Map/ISizeMap";
import ISpeedMap from "../Map/ISpeedMap";
import {HorizontalDirections, VerticalDirections} from "./Directions";
import {Shapes} from "./Shapes";

export default abstract class Item {

    private readonly itemColor: string;
    private readonly itemShape: Shapes;
    private position: ICoordinatesMap;
    private size: ISizeMap;
    private speed: ISpeedMap;
    private direction: IDirectionMap;
    private drawRadius: number;
    private readonly drawStroke: boolean;

    protected constructor(
        color: string,
        shape: Shapes,
        position: ICoordinatesMap,
        size: ISizeMap,
        speed: ISpeedMap,
        direction: IDirectionMap,
        radius: number = 0,
        stroke: boolean = true,
    ) {
        this.itemColor = color;
        this.itemShape = shape;
        this.position = position;
        this.size = size;
        this.speed = speed;
        this.direction = direction;
        this.drawRadius = radius;
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

    get radius(): number { return this.drawRadius; }
    set radius(radius: number) { this.drawRadius = radius; }

    get stroke(): boolean { return this.drawStroke; }

    public nextPosition(): ICoordinatesMap {
        const xCalculator = this.getMotionCalculator(this.direction.horizontal);
        const yCalculator = this.getMotionCalculator(this.direction.vertical);

        return {
            x: xCalculator(this.x, this.hSpeed),
            y: yCalculator(this.y, this.vSpeed),
        };
    }

    protected getMotionCalculator(
        direction: HorizontalDirections | VerticalDirections,
    ): (axis: number, speed: number) => number {
        switch (direction) {
            case VerticalDirections.UP:
            case HorizontalDirections.LEFT:
                return (axis: number, speed: number): number => {
                    return axis - speed;
                };
            case VerticalDirections.DOWN:
            case HorizontalDirections.RIGHT:
                return (axis: number, speed: number): number => {
                    return axis + speed;
                };
            default:
                return (axis: number, speed: number): number => {
                    return axis;
                };
        }
    }
}
