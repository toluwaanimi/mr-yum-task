import Robot from "./robot";
import {PlacementCommand} from "./commands/placement.command";
import {MovementCommand} from "./commands/movement.command";
import {LeftTurnCommand} from "./commands/left-turn.command";
import {RightTurnCommand} from "./commands/right-turn.command";
import {StatusCommand} from "./commands/status.command";
import {CommandTypeEnum} from "../enum";
import {ICommandData, ICommandSet, IOrientation, ISimulator} from "../interface";


/**
 * @class Simulator
 */
export default class Simulator  implements ISimulator{
    private _commandLookup: Map<CommandTypeEnum, ICommandSet> = new Map();

    constructor(private _robot: Robot) {
        this.configure();
    }

    /**
     *
     * @param commandData
     * @description "
     * This function runs a command.
     * It takes an argument commandData which is an object containing information about the command to be executed.
     * The method first uses the commandData.name property to look up a command set in an instance variable _commandLookup,
     * which is assumed to be a map or object that maps command names to command sets.
     *
     * If the command set exists and is enabled, the method calls the execute method of the command object within the set with two arguments,
     * an object containing information about the command's orientation, and an object containing success and failure callbacks.
     * The successCallback and failureCallback are called based on the result of the execution.
     * "
     */
    public run(commandData: ICommandData) {
        const commandSet = this._commandLookup.get(
            <CommandTypeEnum>commandData.name
        );

        if (commandSet?.enabled) {
            commandSet?.command.execute(
                {
                    orientation: <IOrientation>commandData.orientation,
                },
                {
                    successCallback: commandSet?.handlers?.successCallback,
                    failureCallback: commandSet?.handlers?.failureCallback,
                }
            );
        }
    }

    /**
     *
     * @private
     * @description "
     * This function configures the available commands that can be executed.
     * It sets up a mapping of command names to command sets in an instance variable _commandLookup.
     * Each command set contains information about the command's availability, the command object,
     * and the handlers (successCallback and failureCallback) that will be called based on the result of the execution.
     *
     * For example, for the CommandTypeEnum.Place command, it sets the enabled property to true,
     * the command property to an instance of PlacementCommand class and handlers property to call setEnabledCommandExecution(true) function on success and setEnabledCommandExecution(false) function on failure.
     *
     * For the CommandTypeEnum.ReportStatus command, it sets the enabled property to false,
     * the command property to an instance of StatusCommand class and handlers property to call console.log on success,
     * which logs the current position and direction of the robot.
     *
     * this method is being called during the initialization of the object to set up the initial state of the available commands.
     * "
     */
    private configure(): void {
        this._commandLookup.set(CommandTypeEnum.Place, {
            enabled: true,
            command: new PlacementCommand(this._robot),
            handlers: {
                successCallback: () => {
                    this.setEnabledCommandExecution(true);
                },
                failureCallback: () => {
                    this.setEnabledCommandExecution(false);
                },
            },
        });

        this._commandLookup.set(CommandTypeEnum.Move, {
            enabled: false,
            command: new MovementCommand(this._robot),
        });

        this._commandLookup.set(CommandTypeEnum.TurnLeft, {
            enabled: false,
            command: new LeftTurnCommand(this._robot),
        });

        this._commandLookup.set(CommandTypeEnum.TurnRight, {
            enabled: false,
            command: new RightTurnCommand(this._robot),
        });

        this._commandLookup.set(CommandTypeEnum.ReportStatus, {
            enabled: false,
            command: new StatusCommand(),
            handlers: {
                successCallback: () => {
                    console.log(
                        `Output: ${this._robot.getCurrentOrientation().position.x}, ${
                            this._robot.getCurrentOrientation().position.y
                        }, ${this._robot.getCurrentOrientation().direction}`
                    );
                },
            },
        });
    }

    /**
     *
     * @param enabled : boolean
     * @private
     * @description "
     * This function enables or disables the execution of commands.
     * It takes a boolean argument enabled which is used to set the enabled property of all command sets in the _commandLookup object, except for the CommandTypeEnum.Place command.
     *
     * It uses forEach method of _commandLookup object to iterate over all command sets,
     * and for each command set it checks if the commandType is not equal to CommandTypeEnum.Place
     * and if so it updates the enabled property of the command set to the value of the enabled argument.
     * This allows to enable or disable all the commands, except Place command, at once.
     * This method is used to prevent the execution of other commands before the Place command has been executed successfully
     * "
     */
    private setEnabledCommandExecution(enabled: boolean) {
        this._commandLookup.forEach(
            (commandSet: ICommandSet, commandType: CommandTypeEnum): void => {
                if (commandType !== CommandTypeEnum.Place) {
                    commandSet.enabled = enabled;
                }
            }
        );
    }
}
