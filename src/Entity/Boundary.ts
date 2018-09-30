import ICoordinatesMap from "../Map/ICoordinatesMap";
import ISizeMap from "../Map/ISizeMap";
import {HorizontalDirections, VerticalDirections} from "./Enum/Directions";
import {Shapes} from "./Enum/Shapes";
import Item from "./Item";

export default class Boundary extends Item {
    public constructor(position: ICoordinatesMap, size: ISizeMap, color: string = "OrangeRed") {
        super(
            color,
            Shapes.RECTANGLE,
            position,
            size,
            {horizontal: 0, vertical: 0},
            {horizontal: HorizontalDirections.NONE, vertical: VerticalDirections.NONE},
            0,
            false,
        );
    }
}
