import {IPosition} from "../interface";


/**
 * @class PositionConstraint
 */
export class PositionConstraint {
    static create(start: IPosition, end: IPosition): PositionConstraint {
        return new PositionConstraint(start, end);
    }

    constructor(private _lowerBound: IPosition, private _upperBound: IPosition) {}

    public contains(position: IPosition): boolean {
        const lower =
            this._lowerBound.y <= position.y && this._lowerBound.x <= position.x;
        const upper =
            this._upperBound.y > position.y && this._upperBound.x > position.x;
        return lower && upper;
    }
}
