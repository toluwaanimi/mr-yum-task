import {CompassDirectionEnum} from "../enum";

/**
 * @desc "Interface to define the dimension"
 */
export interface IDimension {
    rows: number;
    columns: number;
}

/**
 * @description "Position"
 */
export interface IPosition {
    x: number;
    y: number;
}

/**
 *  @desc "Orientation having position and direction
 */
export interface IOrientation {
    position: IPosition;
    direction: CompassDirectionEnum;
}

/**
 * @description Command data with name and the orientation for the command
 */
export interface ICommandData {
    name: string;
    orientation?: IOrientation;
}

/**
 * @description Command callback function interface
 */
export interface ICommandHandlers {
    successCallback?: () => void;
    failureCallback?: () => void;
}

/**
 * @description command parameter of having orientation
 */

export interface ICommandParameter {
    orientation: IOrientation;
}

/**
 * @description Command interface for class, with the execute function
 */
export interface ICommand {
    execute(parameter: ICommandParameter, handlers: ICommandHandlers): void;
}

/**
 * @description  interface for enabled, command and handlers
 */
export interface ICommandSet {
    enabled: boolean;
    command: ICommand;
    handlers?: ICommandHandlers;
}


/**
 * @description Simulator class interface
 */
export interface ISimulator{

    run(commandData :ICommandData): void;

}