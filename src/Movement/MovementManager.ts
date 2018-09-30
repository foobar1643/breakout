import * as EventEmitter from "eventemitter3";
import {inject, injectable} from "inversify";
import SpatialHashMap from "../Collision/SpatialHashMap";
import Ball from "../Entity/Ball";
import {HorizontalDirections} from "../Entity/Enum/Directions";
import Platform from "../Entity/Platform";
import {KEY_DOWN_EVENT} from "../Input/Keyboard";
import KeyboardGameEvent from "../Input/KeyboardGameEvent";
import {TYPES} from "../types";
import IFreeStateMovable from "./IFreeStateMovable";
import BallProxy from "./Proxy/BallProxy";
import PlatformProxy from "./Proxy/PlatformProxy";

@injectable()
export default class MovementManager {

    private readonly hashMap: SpatialHashMap;
    private emitter: EventEmitter;
    private freeStateItems: IFreeStateMovable[] = [];

    constructor(
        @inject(TYPES.Emitter) emitter: EventEmitter,
        @inject(TYPES.SpatialHashMap) hashMap: SpatialHashMap,
    ) {
        this.emitter = emitter;
        this.hashMap = hashMap;
    }

    public setUpPlatformProxy(platform: Platform): PlatformProxy {
        const proxy = new PlatformProxy(platform);

        this.emitter.on(KEY_DOWN_EVENT, (event: KeyboardGameEvent) => {
            proxy.keyDown(event);
        });

        return proxy;
    }

    public setUpBallProxy(ball: Ball): BallProxy {
        ball.hDirection = HorizontalDirections.LEFT;
        return new BallProxy(ball);
    }

    public addFreeStateItem(item: IFreeStateMovable): void {
        this.freeStateItems.push(item);
    }

    public moveFreeState(): void {
        for (const item of this.freeStateItems) {
            item.freeStateMove(this.hashMap);
        }
    }
}
