import {PositionConstraint} from "./position-constraint";
import {IDimension, IPosition} from "../interface";


/**
 * @class Tabletop
 */
export default class Tabletop {
    private positionConstraint: PositionConstraint;

    constructor(readonly dimension: IDimension) {
        const startingPoint = { x: 0, y: 0 };
        const endingPoint = {
            x: Math.abs(dimension.columns),
            y: Math.abs(dimension.rows),
        };
        this.positionConstraint = new PositionConstraint(
            startingPoint,
            endingPoint
        );
    }

    public contains(position: IPosition): boolean {
        return this.positionConstraint.contains(position);
    }
}
