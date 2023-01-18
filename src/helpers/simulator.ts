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
