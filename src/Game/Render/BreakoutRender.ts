import Item from "../../Engine/Entity/Item";
import {Shapes} from "../../Engine/Entity/Shapes";
import SimpleRender from "../../Engine/Render/SimpleRender";

export default class BreakoutRender extends SimpleRender {

    public render(items: Item[]): void {
        for (const item of items) {
            switch (item.shape) {
                case Shapes.RECTANGLE:
                    this.rectangle(item);
                    break;
                default:
                    throw new Error(`Could not find a render method for Item with shape '${item.shape}'.`);
            }
        }
    }
}
