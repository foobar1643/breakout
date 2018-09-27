import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import IRGBMap from "../Map/IRGBMap";

@injectable()
export default class Canvas implements IScreen {

    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private shown: boolean;

    constructor(
        @inject(TYPES.ScreenWidth) width: number,
        @inject(TYPES.ScreenHeight) height: number,
        @inject(TYPES.ScreenColor) color: IRGBMap,
    ) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;

        const context: CanvasRenderingContext2D | null = this.canvas.getContext("2d");

        if (null === context) {
            throw new Error("Failed to retrieve canvas rendering context.");
        }

        this.shown = false;
        this.context = context;
        this.context.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public showScreen(parentElementId: string): void {
        const parentElement: HTMLElement | null = document.getElementById(parentElementId);

        if (null === parentElement) {
            throw new Error(`Could not find element with ID '${parentElementId}' on current page.`);
        }

        parentElement.appendChild(this.canvas);
        this.shown = true;
    }

    public wasShown(): boolean {
        return this.shown;
    }

    public getRenderContext(): CanvasRenderingContext2D {
        return this.context;
    }
}
