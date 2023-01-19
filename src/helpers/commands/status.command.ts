import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";

/**
 * @class StatusCommand
 */
export class StatusCommand implements ICommand {

    /**
     *
     * @param parameter
     * @param handlers
     * @description "
     * This is the execute method for the REPORT command.
     * It simply calls the successCallback function passed in the handlers object,
     * without making any changes to the robot or its current state.
     * The successCallback function is used to display the current position and orientation of the robot to the user.
     * "
     */
    public execute(parameter: ICommandParameter, handlers: ICommandHandlers): void {
        handlers?.successCallback?.call(handlers);
    }
}
