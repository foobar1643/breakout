import {DirectionsNone, HorizontalDirections, VerticalDirections} from "../Entity/Directions";

export default interface IDirectionMap {
    horizontal: HorizontalDirections | DirectionsNone;
    vertical: VerticalDirections | DirectionsNone;
}
