import {ToyMovementEnum} from "../enum";


/**
 * @class Toy
 * @description "
 * This class has 4 public methods: currentStep(), currentMovement(), step(steps: number) and changeMovement(mode: ToyMovementEnum).
 *
 * It has two private instance variables _currentStep and _currentMovement. _currentStep is initialized to 0 and _currentMovement is initialized to ToyMovementEnum.Forward.
 *
 * The currentStep() method returns the current step of the toy. The currentMovement() method returns the current movement of the toy.
 * The step(steps: number) method moves the toy by a certain number of steps, by adding or subtracting the value of steps from _currentStep depending on the current movement of the toy.
 * The changeMovement(mode: ToyMovementEnum) method changes the movement of the toy to the provided mode.
 * "
 */
export default class Toy {
    private _currentStep: number = 0;
    private _currentMovement: ToyMovementEnum = ToyMovementEnum.Forward;

    /**
     * @description "
     * This returns the current step of the toy.
     * It simply returns the value of the instance variable _currentStep of the class.
     * This method does not take any arguments and simply returns the current step of the toy.
     * "
     */
    public currentStep(): number {
        return this._currentStep;
    }

    /**
     * @description "
     * This function returns the current movement of the toy.
     * It simply returns the value of the instance variable _currentMovement of the class.
     * This variable stores the current movement of the toy, which is updated whenever the toy changes its movement.
     * This method does not take any arguments and simply returns the current movement of the toy.
     * The returned value is enumeration value (ToyMovementEnum) which can be either Forward, Backward or other values.
     * "
     */
    public currentMovement(): ToyMovementEnum {
        return this._currentMovement;
    }

    /**
     *
     * @param steps
     * @description "
     * This function moves the toy by a certain number of steps.
     * It takes an argument steps which is an integer representing the number of steps to move.
     * The method modifies the value of the instance variable _currentStep by adding or subtracting the value of steps depending on the current movement of the toy.
     *
     * It first checks the current movement of the toy, which is stored in the instance variable _currentMovement.
     * If it is equal to ToyMovementEnum.Forward, the method adds steps to _currentStep, otherwise it subtracts steps from _currentStep.
     * This method update the position of the toy after it has moved.
     * "
     */
    public step(steps: number): void {
        this._currentStep +=
            this._currentMovement === ToyMovementEnum.Forward ? steps : -steps;
    }

    /**
     *
     * @param mode
     * @description "
     * This function changes the movement of the toy.
     * It takes an argument mode which is an enumeration value (ToyMovementEnum) that represents the new movement of the toy.
     * The method sets the value of the instance variable _currentMovement to the value of mode. This allows to change the movement of the toy to forward or backward,
     * it is used to change the direction of the toy. This method does not return anything.
     * "
     */
    public changeMovement(mode: ToyMovementEnum): void {
        this._currentMovement = mode;
    }
}
