import Robot from "../robot";
import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";


/**
 * @class MovementCommand
 * @description "Class to implement the movement command"
 */
export class MovementCommand implements ICommand {
    constructor(private _robot: Robot) {}

    /**
     *
     * @param parameter
     * @param handlers
     * @description "
     * The execute method takes in two parameters: parameter and handlers.
     * parameter is of type ICommandParameter , while handlers is of type ICommandHandlers.
     * In this case, the method checks if the movement of the robot is allowed by calling the movementIsAllowed() method. If the movement is allowed, the method calls the step method on the _robot object,
     * passing in a value of 1, which moves the robot forward by one step.
     * "
     */
    public execute(parameter: ICommandParameter, handlers: ICommandHandlers): void {
        if (this.movementIsAllowed()) {
            this._robot.step(1);
        }
    }


    /**
     *
     * @private
     * @description "
     * This is a private helper method for the MovementCommand class.
     * It is used to check if the next movement of the robot is within the constraints of the tabletop.
     * The method checks if the next position of the robot as calculated by the peekNextPosition method of the Robot class is within the boundaries of the tabletop by calling the contains method of the Tabletop class.
     * The method returns true if the next movement is within the constraints and false otherwise.
     * "
     */
    private movementIsAllowed(): boolean {
        console.log(this._robot.peekNextPosition())
        return this._robot.tabletop.contains(this._robot.peekNextPosition()) && this._robot.tabletop.canMoveToPosition(this._robot.peekNextPosition())
    }
}