import {ICommand, ICommandHandlers, ICommandParameter} from "../../interface";

/**
 * @class StatusCommand
 */
export class StatusCommand implements ICommand {
    public execute(parameter: ICommandParameter, handlers: ICommandHandlers): void {
        handlers?.successCallback?.call(handlers);
    }
}
