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
 *  @desc
 */
export interface IOrientation {
    position: IPosition;
    direction: CompassDirectionEnum;
}

export interface ICommandData {
    name: string;
    orientation?: IOrientation;
}

export interface ICommandHandlers {
    successCallback?: () => void;
    failureCallback?: () => void;
}

export interface ICommandParameter {
    orientation: IOrientation;
}

export interface ICommand {
    execute(parameter: ICommandParameter, handlers: ICommandHandlers): void;
}

export interface ICommandSet {
    enabled: boolean;
    command: ICommand;
    handlers?: ICommandHandlers;
}



export interface ISimulator{

    run(commandData :ICommandData): void;

}