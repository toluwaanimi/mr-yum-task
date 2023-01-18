import Toy from "./toy";
import Tabletop from "./table-top";
import {CompassDirectionEnum, MotorMovementEnum, TurnAngleEnum} from "../enum";
import {IOrientation, IPosition} from "../interface";


/**
 * @class Robot
 */
export default class Robot {
    private _activeMotor: Toy;
    private readonly _verticalMovementMotor: Toy;
    private readonly _horizontalMovementMotor: Toy;

    constructor(readonly tabletop: Tabletop) {
        this._verticalMovementMotor = new Toy();
        this._horizontalMovementMotor = new Toy();
        this._activeMotor = this._verticalMovementMotor;
    }

    public reset(): void {
        this._verticalMovementMotor.changeMovement(MotorMovementEnum.Backward);
        this._horizontalMovementMotor.changeMovement(MotorMovementEnum.Backward);

        while (this._verticalMovementMotor.currentStep() > 0) {
            this._verticalMovementMotor.step(1);
        }

        while (this._horizontalMovementMotor.currentStep() > 0) {
            this._horizontalMovementMotor.step(1);
        }

        while (this.getCurrentDirection() !== CompassDirectionEnum.North) {
            this.turnLeft();
        }
    }

    public step(stepCount: number): void {
        if (this.tabletop.contains(this.peekNextPosition())) {
            this._activeMotor.step(stepCount);
        }
    }

    public turnLeft(): void {
        this.turn(TurnAngleEnum.Minus90);
    }

    public turnRight(): void {
        this.turn(TurnAngleEnum.Plus90);
    }

    public getCurrentOrientation(): IOrientation {
        return {
            position: this.getCurrentPosition(),
            direction: this.getCurrentDirection(),
        };
    }

    public peekNextPosition(): IPosition {
        let currentHorizontalStep = this._horizontalMovementMotor.currentStep();
        let currentVerticalStep = this._verticalMovementMotor.currentStep();

        this._activeMotor === this._horizontalMovementMotor
            ? this._activeMotor.currentMovement() === MotorMovementEnum.Backward
                ? --currentHorizontalStep
                : ++currentHorizontalStep
            : this._activeMotor.currentMovement() === MotorMovementEnum.Backward
                ? --currentVerticalStep
                : ++currentVerticalStep;
        return {
            x: currentHorizontalStep,
            y: currentVerticalStep,
        };
    }

    private turn(degree: TurnAngleEnum): void {
        let nextMode;

        if (degree === TurnAngleEnum.Minus90) {
            nextMode =
                this.getCurrentDirection() === CompassDirectionEnum.North ||
                this.getCurrentDirection() === CompassDirectionEnum.West
                    ? MotorMovementEnum.Backward
                    : MotorMovementEnum.Forward;
        } else {
            nextMode =
                this.getCurrentDirection() === CompassDirectionEnum.North ||
                this.getCurrentDirection() === CompassDirectionEnum.West
                    ? MotorMovementEnum.Forward
                    : MotorMovementEnum.Backward;
        }

        this.switchMotor();
        this._activeMotor.changeMovement(nextMode);
    }

    private switchMotor(): void {
        this._activeMotor =
            this._activeMotor === this._verticalMovementMotor
                ? this._horizontalMovementMotor
                : this._verticalMovementMotor;
    }

    private getCurrentPosition(): IPosition {
        return {
            x: this._horizontalMovementMotor.currentStep(),
            y: this._verticalMovementMotor.currentStep(),
        };
    }

    private getCurrentDirection(): CompassDirectionEnum {
        if (this._activeMotor === this._verticalMovementMotor) {
            return this._activeMotor.currentMovement() === MotorMovementEnum.Forward
                ? CompassDirectionEnum.North
                : CompassDirectionEnum.South;
        } else if (this._activeMotor === this._horizontalMovementMotor) {
            return this._activeMotor.currentMovement() === MotorMovementEnum.Forward
                ? CompassDirectionEnum.East
                : CompassDirectionEnum.West;
        } else {
            return CompassDirectionEnum.North;
        }
    }
}
