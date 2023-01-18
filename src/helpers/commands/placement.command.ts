import {Command} from "commander";
import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";
import Robot from "../robot";


/**
 * @class PlacementCommand
 * @description "Class to implement the placement command"
 */
export class PlacementCommand implements ICommand {
    constructor(private _robot: Robot) {}

    public execute(parameter: ICommandParameter, handlers: ICommandHandlers): void {
        if (this._robot.tabletop.contains(parameter.orientation.position)) {
            this._robot.reset();

            while (
                this._robot.getCurrentOrientation().position.y !==
                parameter.orientation.position.y
                ) {
                this._robot.step(1);
            }

            this._robot.turnRight();

            while (
                this._robot.getCurrentOrientation().position.x !==
                parameter.orientation.position.x
                ) {
                this._robot.step(1);
            }

            while (
                this._robot.getCurrentOrientation().direction !==
                parameter.orientation.direction
                ) {
                this._robot.turnLeft();
            }

            handlers?.successCallback?.call(handlers);
        } else {
            handlers?.failureCallback?.call(handlers);
        }
    }
}