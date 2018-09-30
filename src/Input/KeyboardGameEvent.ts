import {KeyboardKeys} from "./KeyboardKeys";

export default class KeyboardGameEvent {

    public key: KeyboardKeys;

    constructor(key: KeyboardKeys) {
        this.key = key;
    }
}
