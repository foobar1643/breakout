import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import BreakoutRender from "./Render/BreakoutRender";

export enum GameState {
    ACTIVE = 0,
    PAUSED = 1,
}

@injectable()
export default class GameLoop {

    private render: BreakoutRender;
    private state: GameState;

    constructor(
        @inject(TYPES.Render) render: BreakoutRender,
        @inject(TYPES.ScreenParent) screenParent: string,
    ) {
        this.render = render;
        this.state = GameState.PAUSED;

        this.render.drawScreen(screenParent);
    }

    public start() {
        this.state = GameState.ACTIVE;
        this.loop();
    }

    public pause() {
        this.state = GameState.PAUSED;
    }

    private loop() {
        if (GameState.PAUSED === this.state) {
            return;
        }

        window.requestAnimationFrame(this.loop.bind(this));
    }

}
