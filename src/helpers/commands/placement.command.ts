import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";
import Robot from "../robot";


/**
 * @class PlacementCommand
 * @description "Class to implement the placement command"
 */
export class PlacementCommand implements ICommand {
    constructor(private _robot: Robot) {}

    /**
     *
     * @param parameter
     * @param handlers
     * @description "
     * This function is the implementation of the execute method for the PlacementCommand class.
     * It is responsible for placing the robot on the tabletop at the given position and orientation. The method takes two parameters, parameter and handlers.
     *
     * The method starts by checking if the given position is within the boundaries of the tabletop.
     * If it is not, it calls the failure callback function and exits the method. If the position is valid,
     * it first resets the robot's current position and orientation to the default values.
     * Then, it moves the robot to the desired y-coordinate by repeatedly calling the step method.
     * After reaching the correct y-coordinate, it turns the robot to the desired direction.
     * Then, it moves the robot to the desired x-coordinate by repeatedly calling the step method.
     * Finally, it turns the robot to the desired final direction by repeatedly calling the turnLeft method. If all the steps are successful, it calls the success callback function.
     * "
     */
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