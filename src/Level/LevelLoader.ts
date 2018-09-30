import {inject, injectable} from "inversify";
import Ball from "../Entity/Ball";
import Brick from "../Entity/Brick";
import Platform from "../Entity/Platform";
import {TYPES} from "../types";
import GameLevel from "./GameLevel";
import Boundary from "../Entity/Boundary";

@injectable()
export default class LevelLoader {

    private readonly screenWidth: number;
    private readonly screenHeight: number;

    public constructor(
        @inject(TYPES.ScreenWidth) screenWidth: number,
        @inject(TYPES.ScreenHeight) screenHeight: number,
    ) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    public load(bricks: number = 50): GameLevel {
        const level = new GameLevel(
            new Platform("silver", {x: (this.screenWidth / 2) - (180 / 2), y: 560}),
            new Ball("maroon", {x: this.screenWidth / 2, y: 540}),
        );

        // level.addBoundaries(this.getBoundaries(3));

        let xPosition = 10;
        let yPosition = 10;

        for (let i = 0; i < bricks; i++) {
            level.addBrick(new Brick({x: xPosition, y: yPosition}));
            xPosition = xPosition + 78;

            if (xPosition + 78 >= this.screenWidth) {
                xPosition = 10;
                yPosition = yPosition + 23;
            }
        }

        return level;
    }

    private getBoundaries(size: number): Boundary[] {
        return [
            new Boundary({x: 0, y: 0}, {width: this.screenWidth, height: size}),
            new Boundary({x: 0, y: 0}, {width: size, height: this.screenHeight}),
            new Boundary({x: this.screenWidth - size, y: 0}, {width: 5, height: this.screenHeight}),
            new Boundary({x: 0, y: this.screenHeight - size}, {width: this.screenWidth, height: size}),
        ];
    }
}
