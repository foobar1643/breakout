import {injectable} from "inversify";
import {inject} from "inversify";
import {Shapes} from "../Entity/Enum/Shapes";
import Item from "../Entity/Item";
import {TYPES} from "../types";
import SimpleRender from "./SimpleRender";
import SpatialHashMap from "../Collision/SpatialHashMap";
import has = Reflect.has;

@injectable()
export default class BreakoutRender extends SimpleRender {

    constructor(@inject(TYPES.Canvas) screen: IScreen) {
        super(screen);
    }

    public drawScreen(parentElement: string) {
        if (!this.screen.wasShown()) {
            this.screen.showScreen(parentElement);
            this.screen.resetScreen();
        }
    }

    public render(items: Item[]): void {
        for (const item of items) {
            switch (item.shape) {
                case Shapes.RECTANGLE:
                    this.rectangle(item);
                    break;
                case Shapes.CIRCLE:
                    this.circle(item);
                    break;
                default:
                    throw new Error(`Could not find a render method for Item with shape '${item.shape}'.`);
            }
        }
    }

    public grid(hashMap: SpatialHashMap) {
        let x = 0;
        let y = 0;

        for (let i = 0; i < hashMap.lines; i++) {
            super.line(1, "blue", {x: 0, y}, {x: this.screen.width, y});

            for (let j = 0; j < hashMap.columns; j++) {
                super.line(1, "blue", {x, y: 0}, {x, y: this.screen.height});
                x += hashMap.cellProportions;
            }

            y += hashMap.cellProportions;
        }
    }

    public fps(counter: number) {
        this.context.font = "13px Arial";
        this.context.fillStyle = "black";
        this.context.fillText(`${counter} FPS`, this.screen.width - 45, this.screen.height - 5);
    }
}
