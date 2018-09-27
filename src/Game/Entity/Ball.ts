import Item from "../../Engine/Entity/Item";
import {Shapes} from "../../Engine/Entity/Shapes";
import ICoordinatesMap from "../../Engine/Map/ICoordinatesMap";
import IDirectionMap from "../../Engine/Map/IDirectionMap";
import ISpeedMap from "../../Engine/Map/ISpeedMap";

export default class Ball extends Item {

    constructor(
        color: string,
        position: ICoordinatesMap,
        speed: ISpeedMap,
        direction: IDirectionMap,
        radius: number,
    ) {
        super(
            color,
            Shapes.CIRCLE,
            position,
            {height: 155, width: 155},
            speed,
            direction,
            radius,
        );
    }
}
