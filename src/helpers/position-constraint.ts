import {IPosition} from "../interface";


/**
 * @class PositionConstraint
 */
export class PositionConstraint {
    /**
     * @param start
     * @param end
     * @returns PositionConstraint
     * @description "
     *
     * This method creates a new PositionConstraint object with the given start and end positions.
     * It is a static method, which means that it can be called directly on the class without having to instantiate an object first.
     * This is useful for creating a new instance of PositionConstraint without having to use the 'new' keyword
     * "
     */
    static create(start: IPosition, end: IPosition): PositionConstraint {
        return new PositionConstraint(start, end);
    }


    constructor(private _lowerBound: IPosition, private _upperBound: IPosition) {}

    /**
     *
     * @param position : IPosition
     * @description "contains() This function checks if a given position (of type IPosition) is within the bounds of a rectangular area defined by the object's _lowerBound and _upperBound properties (also of type IPosition)"
     * @returns boolean
     */
    public contains(position: IPosition): boolean {
        const lower =
            this._lowerBound.y <= position.y && this._lowerBound.x <= position.x;
        const upper =
            this._upperBound.y > position.y && this._upperBound.x > position.x;
        return lower && upper;
    }
}
