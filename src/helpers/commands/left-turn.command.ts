import Robot from "../robot";
import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";


/**
 * @class LeftTurnCommand
 * @description "Class to implement the turn left command"
 */
export class LeftTurnCommand implements ICommand {
    constructor(private _robot: Robot) {}

    public execute(parameter: ICommandParameter, handlers: ICommandHandlers): void {
        this._robot.turnLeft();
    }
}