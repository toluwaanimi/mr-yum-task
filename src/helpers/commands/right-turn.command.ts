import Robot from "../robot";
import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";


/**
 * @class RightTurnCommand
 * @description "Class to implement the turn right command"
 */
export class RightTurnCommand implements ICommand {
    constructor(private _robot: Robot) {}

    /**
     *
     * @param parameter
     * @param handlers
     * @description "
     * This function is the implementation of the execute method for the RightTurnCommand class.
     * The method takes in two parameters, parameter and handlers, which are both defined as interfaces ICommandParameter and ICommandHandlers.
     *
     * The method first calls the turnRight method on the _robot object which is an instance of the Robot class.
     * This method is used to change the direction of the robot to the right. The handlers parameter is not used in this method,
     * so it does not affect the robot's movement in any way.
     * "
     */
    public execute(parameter: ICommandParameter, handlers: ICommandHandlers): void {
        this._robot.turnRight();
    }
}
