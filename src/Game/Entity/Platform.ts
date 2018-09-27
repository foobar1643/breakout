import Item from "../../Engine/Entity/Item";
import {Shapes} from "../../Engine/Entity/Shapes";
import ICoordinatesMap from "../../Engine/Map/ICoordinatesMap";
import IDirectionMap from "../../Engine/Map/IDirectionMap";
import ISizeMap from "../../Engine/Map/ISizeMap";
import ISpeedMap from "../../Engine/Map/ISpeedMap";

export default class Platform extends Item {

    constructor(
        color: string,
        position: ICoordinatesMap,
        speed: ISpeedMap,
        direction: IDirectionMap,
        size: ISizeMap = {width: 180, height: 20},
    ) {
        super(
            color,
            Shapes.RECTANGLE,
            position,
            size,
            speed,
            direction,
        );
    }
}
