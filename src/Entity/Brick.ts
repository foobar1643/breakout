import ICoordinatesMap from "../Map/ICoordinatesMap";
import {HorizontalDirections, VerticalDirections} from "./Enum/Directions";
import {Shapes} from "./Enum/Shapes";
import Item from "./Item";

export default class Brick extends Item {

    public constructor(
        position: ICoordinatesMap,
        color: string = "teal",
    ) {
        super(
            color,
            Shapes.RECTANGLE,
            position,
            {width: 75, height: 20},
            {horizontal: 0, vertical: 0},
            {horizontal: HorizontalDirections.NONE, vertical: VerticalDirections.NONE},
        );
    }
}
