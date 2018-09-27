import {injectable} from "inversify";
import {inject} from "inversify";
import Item from "../../Engine/Entity/Item";
import {Shapes} from "../../Engine/Entity/Shapes";
import SimpleRender from "../../Engine/Render/SimpleRender";
import {TYPES} from "../../types";

@injectable()
export default class BreakoutRender extends SimpleRender {

    constructor(@inject(TYPES.Canvas) screen: IScreen) {
        super(screen);
    }

    public drawScreen(parentElement: string) {
        if (!this.screen.wasShown()) {
            this.screen.showScreen(parentElement);
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
}
