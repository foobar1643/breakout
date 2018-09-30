import SpatialHashMap from "../Collision/SpatialHashMap";

export default interface IFreeStateMovable {
    freeStateMove(hashMap: SpatialHashMap): void;
}
