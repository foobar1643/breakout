import {injectable} from "inversify";
import Item from "../Entity/Item";
import {Shapes} from "../Entity/Shapes";
import ICoordinatesMap from "../Map/ICoordinatesMap";

@injectable()
export default abstract class SimpleRender {

    protected readonly screen: IScreen;
    protected readonly context: CanvasRenderingContext2D;

    protected constructor(screen: IScreen) {
        this.screen = screen;
        this.context = this.screen.getRenderContext();
    }

    protected line(size: number, style: string, start: ICoordinatesMap, end: ICoordinatesMap): void {
        this.context.beginPath();
        this.context.lineWidth = size;
        this.context.strokeStyle = style;
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
    }

    protected rectangle(item: Item): void {
        if (Shapes.RECTANGLE !== item.shape) {
            throw new Error(`Cannot draw shape ${item.shape} as rectangle.`);
        }

        if (item.stroke) {
            this.context.strokeStyle = "black";
            this.context.lineWidth = 2;
            this.context.strokeRect(item.x, item.y, item.width, item.height);
        }

        this.context.fillStyle = item.color;
        this.context.fillRect(item.x, item.y, item.width, item.height);
    }

    protected circle(item: Item): void {
        if (Shapes.CIRCLE !== item.shape) {
            throw new Error(`Cannot draw shape ${item.shape} as circle.`);
        }

        this.context.beginPath();
        this.context.arc(item.x, item.y, item.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = item.color;
        this.context.fill();

        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;
        this.context.stroke();
    }
}
