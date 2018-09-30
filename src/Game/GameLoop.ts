import {inject, injectable} from "inversify";
import SpatialHashMap from "../Collision/SpatialHashMap";
import {Keyboard} from "../Input/Keyboard";
import GameLevel from "../Level/GameLevel";
import LevelLoader from "../Level/LevelLoader";
import MovementManager from "../Movement/MovementManager";
import BreakoutRender from "../Render/BreakoutRender";
import {TYPES} from "../types";

enum GameState {
    ACTIVE = 0,
    PAUSED = 1,
}

@injectable()
export default class GameLoop {

    private render: BreakoutRender;
    private state: GameState;
    private keyboard: Keyboard;
    private movement: MovementManager;
    private loader: LevelLoader;
    private hashMap: SpatialHashMap;
    private level: GameLevel;
    private times: number[] = [];

    constructor(
        @inject(TYPES.Render) render: BreakoutRender,
        @inject(TYPES.ScreenParent) screenParent: string,
        @inject(TYPES.Keyboard) keyboard: Keyboard,
        @inject(TYPES.Movement) movement: MovementManager,
        @inject(TYPES.SpatialHashMap) hashMap: SpatialHashMap,
        @inject(TYPES.Loader) loader: LevelLoader,
    ) {
        this.render = render;
        this.state = GameState.PAUSED;
        this.keyboard = keyboard;
        this.movement = movement;
        this.hashMap = hashMap;
        this.loader = loader;
        this.level = this.loader.load(0);

        this.render.drawScreen(screenParent);
    }

    public start() {
        this.state = GameState.ACTIVE;
        this.keyboard.subscribe(window);
        this.level = this.loader.load(0);

        this.movement.setUpPlatformProxy(this.level.getPlatform());
        const ballProxy = this.movement.setUpBallProxy(this.level.getBall());
        this.movement.addFreeStateItem(ballProxy);

        this.loop();
    }

    private loop() {
        if (GameState.PAUSED === this.state) {
            return;
        }

        this.hashMap.clear();
        this.hashMap.items(this.level.all());
        this.movement.moveFreeState();
        this.render.resetScreen();
        this.render.grid(this.hashMap);
        this.render.render(this.level.all());
        this.showFpsCounter();

        window.requestAnimationFrame(this.loop.bind(this));
    }

    private showFpsCounter(): void {
        const now = performance.now();

        while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
        }

        this.times.push(now);
        this.render.fps(this.times.length);
    }
}
