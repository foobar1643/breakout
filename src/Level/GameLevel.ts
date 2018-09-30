import Ball from "../Entity/Ball";
import Boundary from "../Entity/Boundary";
import Brick from "../Entity/Brick";
import Item from "../Entity/Item";
import Platform from "../Entity/Platform";

export default class GameLevel {

    private readonly platform: Platform;
    private readonly ball: Ball;
    private readonly bricks: Brick[] = [];
    private boundaries: Boundary[] = [];

    constructor(platform: Platform, ball: Ball, bricks: Brick[] = []) {
        this.platform = platform;
        this.ball = ball;
        this.bricks = bricks;
    }

    public all(): Item[] {
        return [this.platform, this.ball].concat(this.bricks).concat(this.boundaries);
    }

    public getPlatform(): Platform {
        return this.platform;
    }

    public getBall(): Ball {
        return this.ball;
    }

    public addBrick(brick: Brick) {
        this.bricks.push(brick);
    }

    public addBoundaries(boundaries: Boundary[]) {
        this.boundaries = this.boundaries.concat(boundaries);
    }

    public prependBrick(brick: Brick) {
        this.bricks.unshift(brick);
    }
}
