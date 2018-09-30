import Ball from "../../Entity/Ball";
import {HorizontalDirections} from "../../Entity/Enum/Directions";
import Platform from "../../Entity/Platform";
import KeyboardGameEvent from "../../Input/KeyboardGameEvent";
import {KeyboardKeys} from "../../Input/KeyboardKeys";

export default class PlatformProxy {

    private platform: Platform;
    private ball: Ball | null = null;

    public constructor(platform: Platform) {
        this.platform = platform;
    }

    public isBound(): boolean {
        return null !== this.ball;
    }

    public bind(ball: Ball) {
        this.ball = ball;
    }

    public keyDown(event: KeyboardGameEvent): void {
        const key = event.key;

        switch (true) {
            case ([KeyboardKeys.A, KeyboardKeys.D].includes(key)):
                return this.move(key);
            case (KeyboardKeys.SPACE === key):
                return this.release();
        }
    }

    private release(): void {
        this.ball = null;
    }

    private move(key: KeyboardKeys): void {
        this.platform.hDirection = (KeyboardKeys.A === key) ? HorizontalDirections.LEFT : HorizontalDirections.RIGHT;
        const nextPosition = this.platform.nextPosition();
        this.platform.applyPosition(nextPosition);
    }
}
