import Robot from "../robot";
import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";


/**
 * @class MovementCommand
 * @description "Class to implement the movement command"
 */
export class MovementCommand implements ICommand {
    constructor(private _robot: Robot) {}

    public execute(parameter: ICommandParameter, handlers: ICommandHandlers): void {
        if (this.movementIsAllowed()) {
            this._robot.step(1);
        }
    }

    private movementIsAllowed(): boolean {
        return this._robot.tabletop.contains(this._robot.peekNextPosition());
    }
}