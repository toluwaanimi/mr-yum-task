import Robot from "../robot";
import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";


/**
 * @class LeftTurnCommand
 * @description "Class to implement the turn left command"
 */
export class LeftTurnCommand implements ICommand {
    constructor(private _robot: Robot) {}

    /**
     *
     * @param parameter
     * @param handlers
     * @description "
     *
     * The execute method of the LeftTurnCommand class is used to execute the "LEFT" command.
     * It takes in a parameter of type ICommandParameter and a set of command handlers (ICommandHandlers).
     * The method changes the direction of the robot by calling the turnLeft() method on the _robot property.
     * This changes the direction of the robot 90 degrees to the left, based on the current direction it is facing.
     * "
     */
    public execute(parameter: ICommandParameter, handlers: ICommandHandlers): void {
        this._robot.turnLeft();
    }
}