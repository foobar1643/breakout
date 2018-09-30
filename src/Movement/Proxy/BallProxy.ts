import SpatialHashMap from "../../Collision/SpatialHashMap";
import Ball from "../../Entity/Ball";
import {HorizontalDirections} from "../../Entity/Enum/Directions";
import IFreeStateMovable from "../IFreeStateMovable";

export default class BallProxy implements IFreeStateMovable {

    private readonly ball: Ball;

    public constructor(ball: Ball) {
        this.ball = ball;
    }

    public freeStateMove(hashMap: SpatialHashMap): void {
        const nearbyItems = hashMap.nearby(this.ball);
        const nextPosition = this.ball.nextPosition();

        for (const item of nearbyItems) {
            if (nextPosition.x >= item.x) {
                this.ball.hDirection = (HorizontalDirections.LEFT === this.ball.hDirection)
                    ? HorizontalDirections.RIGHT
                    : HorizontalDirections.LEFT;
                return;
            }
        }

        this.ball.applyPosition(nextPosition);
    }
}
