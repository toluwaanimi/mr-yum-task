import Robot from "../robot";
import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";


/**
 * @class RightTurnCommand
 * @description "Class to implement the turn right command"
 */
export class RightTurnCommand implements ICommand {
    constructor(private _robot: Robot) {}

    public execute(parameter: ICommandParameter, handlers: ICommandHandlers): void {
        this._robot.turnRight();
    }
}
