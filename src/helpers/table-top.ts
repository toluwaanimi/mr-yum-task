import {PositionConstraint} from "./position-constraint";
import {IDimension, IPosition} from "../interface";


/**
 * @class Tabletop
 */
export default class Tabletop {
    private positionConstraint: PositionConstraint;
    private _potholes: IPosition[];

    /**
     *
     * @param dimension
     * @param position
     * @description "
     * constructor of a class.
     * The constructor takes one argument dimension which is an object that contains information about the size of the area in which the object will move.
     * The constructor creates two objects, startingPoint and endingPoint, that define the limits of the area in which the object can move. startingPoint is set to { x: 0, y: 0 }
     * and endingPoint is set to { x: Math.abs(dimension.columns), y: Math.abs(dimension.rows) }.
     *
     * Then it creates a new instance of PositionConstraint class with startingPoint and endingPoint as arguments.
     * This class is likely used to enforce constraints on the object's movement, so that it cannot move outside the defined area.
     * The readonly keyword before the constructor function argument means that this dimension property can't be modified after the object is created.
     * "
     */
    constructor(readonly dimension: IDimension, readonly position : IPosition[]) {
        const startingPoint = { x: 0, y: 0 };
        const endingPoint = {
            x: Math.abs(dimension.columns),
            y: Math.abs(dimension.rows),
        };
        this.positionConstraint = new PositionConstraint(
            startingPoint,
            endingPoint
        );
        this._potholes = position;
    }

    /**
     *
     * @param position
     * @description "
     * This method that checks whether a given position is within the area defined by the PositionConstraint object.
     * It takes one argument position which is an object containing the x,y coordinates of a point.
     * The method calls the contains method of the positionConstraint object, passing the position argument as the parameter.
     * The contains method of positionConstraint class is likely to check if the position is within the area defined by the startingPoint and endingPoint passed to the class's constructor.
     * This method returns a boolean value indicating whether the given position is within the defined area or not.
     * "
     */
    public contains(position: IPosition): boolean {
        return this.positionConstraint.contains(position);
    }


    public canMoveToPosition(position: IPosition): boolean {
        for (let pothole of this._potholes) {
            if (this.contains(pothole) && pothole.x !== position.x && position.y !== pothole.y) {
                return true;
            }
        }
        return false;
    }

}
