import GameLoop from "./Game/GameLoop";
import {container} from "./inversify.config";
import {TYPES} from "./types";

window.onload = () => {
    const gameLoop = container.get<GameLoop>(TYPES.GameLoop);
    gameLoop.start();
    gameLoop.pause();
};
