import {inject, injectable} from "inversify";
import IRGBMap from "../Map/IRGBMap";
import {TYPES} from "../types";

@injectable()
export default class Canvas implements IScreen {

    public readonly width: number;
    public readonly height: number;
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly color: IRGBMap;
    private shown: boolean;

    constructor(
        @inject(TYPES.ScreenWidth) width: number,
        @inject(TYPES.ScreenHeight) height: number,
        @inject(TYPES.ScreenColor) color: IRGBMap,
    ) {
        this.width = width;
        this.height = height;
        this.shown = false;
        this.color = color;
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        const context: CanvasRenderingContext2D | null = this.canvas.getContext("2d");

        if (null === context) {
            throw new Error("Failed to retrieve canvas rendering context.");
        }

        this.context = context;
    }

    public showScreen(parentElementId: string): void {
        const parentElement: HTMLElement | null = document.getElementById(parentElementId);

        if (null === parentElement) {
            throw new Error(`Could not find element with ID '${parentElementId}' on current page.`);
        }

        parentElement.appendChild(this.canvas);
        this.shown = true;
    }

    public resetScreen() {
        this.context.fillStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public wasShown(): boolean {
        return this.shown;
    }

    public getRenderContext(): CanvasRenderingContext2D {
        return this.context;
    }
}
