import ICoordinatesMap from "../Map/ICoordinatesMap";
import IDirectionMap from "../Map/IDirectionMap";
import ISizeMap from "../Map/ISizeMap";
import ISpeedMap from "../Map/ISpeedMap";
import {HorizontalDirections, VerticalDirections} from "./Enum/Directions";
import {Shapes} from "./Enum/Shapes";
import Item from "./Item";

export default class Platform extends Item {

    constructor(
        color: string,
        position: ICoordinatesMap,
        speed: ISpeedMap = {horizontal: 6, vertical: 0},
        direction: IDirectionMap = {horizontal: HorizontalDirections.NONE, vertical: VerticalDirections.NONE},
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
