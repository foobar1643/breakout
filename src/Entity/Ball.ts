import ICoordinatesMap from "../Map/ICoordinatesMap";
import IDirectionMap from "../Map/IDirectionMap";
import ISpeedMap from "../Map/ISpeedMap";
import {HorizontalDirections, VerticalDirections} from "./Enum/Directions";
import {Shapes} from "./Enum/Shapes";
import Item from "./Item";

export default class Ball extends Item {

    constructor(
        color: string,
        position: ICoordinatesMap,
        radius: number = 7,
        speed: ISpeedMap = {horizontal: 1.2, vertical: 1},
        direction: IDirectionMap = {horizontal: HorizontalDirections.NONE, vertical: VerticalDirections.NONE},
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
