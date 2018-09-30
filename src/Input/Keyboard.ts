import * as EventEmitter from "eventemitter3";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import KeyboardGameEvent from "./KeyboardGameEvent";
import {KeyboardKeys} from "./KeyboardKeys";

export const KEY_DOWN_EVENT = "keydown";

@injectable()
export class Keyboard {

    private emitter: EventEmitter;

    constructor(@inject(TYPES.Emitter) emitter: EventEmitter) {
        this.emitter = emitter;
    }

    public subscribe(window: Window) {
        window.addEventListener("keydown", this.keyDown.bind(this));
    }

    private keyDown(event: KeyboardEvent) {
        const keyCode: string = event.code;

        if (!Object.values(KeyboardKeys).includes(keyCode)) {
            return;
        }

        this.emitter.emit(KEY_DOWN_EVENT, new KeyboardGameEvent(keyCode as KeyboardKeys));
    }
}
