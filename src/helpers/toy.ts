import {MotorMovementEnum} from "../enum";


/**
 * @class Toy
 */
export default class Toy {
    private _currentStep: number = 0;
    private _currentMovement: MotorMovementEnum = MotorMovementEnum.Forward;

    public currentStep(): number {
        return this._currentStep;
    }

    public currentMovement(): MotorMovementEnum {
        return this._currentMovement;
    }

    public step(steps: number): void {
        this._currentStep +=
            this._currentMovement === MotorMovementEnum.Forward ? steps : -steps;
    }

    public changeMovement(mode: MotorMovementEnum): void {
        this._currentMovement = mode;
    }
}
