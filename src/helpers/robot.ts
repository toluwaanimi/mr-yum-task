import Toy from "./toy";
import Tabletop from "./table-top";
import {CompassDirectionEnum, ToyMovementEnum, TurnAngleEnum} from "../enum";
import {IOrientation, IPosition} from "../interface";


/**
 * @class Robot
 */
export default class Robot {
    private _activeToy: Toy;
    private readonly _verticalMovementToy: Toy;
    private readonly _horizontalMovementToy: Toy;

    constructor(readonly tabletop: Tabletop) {
        this._verticalMovementToy = new Toy();
        this._horizontalMovementToy = new Toy();
        this._activeToy = this._verticalMovementToy;
    }

    /**
     * @name reset()
     * @description "This function resets the object's position and direction to its original state.
     * It does this by first changing the vertical and horizontal movement toys' movements to "Backward" and
     * then repeatedly stepping the toys until their current step count is 0. It also repeatedly turns the object left until
     * its current direction is "North"."
     */
    public reset(): void {
        this._verticalMovementToy.changeMovement(ToyMovementEnum.Backward);
        this._horizontalMovementToy.changeMovement(ToyMovementEnum.Backward);

        while (this._verticalMovementToy.currentStep() > 0) {
            this._verticalMovementToy.step(1);
        }

        while (this._horizontalMovementToy.currentStep() > 0) {
            this._horizontalMovementToy.step(1);
        }

        while (this.getCurrentDirection() !== CompassDirectionEnum.North) {
            this.turnLeft();
        }
    }

    /**
     *
     * @param stepCount : number
     * @name step(stepCount: number):void
     * @returns void
     * @description "This function moves the object a specified number of steps in the direction it is currently facing.
     * The step count is passed as an argument to the function. Before taking the step,
     * it calls the peekNextPosition function and check if the next position is within the tabletop using tabletop.contains().
     * If the next position is within the tabletop, it will allow the object to take the step by calling the step() function on the _activeToy with the provided stepCount.
     * If the next position is outside the tabletop, it will not move the object."
     */
    public step(stepCount: number): void {
        if (this.tabletop.contains(this.peekNextPosition())) {
            this._activeToy.step(stepCount);
        }
    }

    /**
     * @name turnLeft()
     * @description "This function rotates the object 90 degrees to the left.
     * It does this by calling the turn() function with the argument TurnAngleEnum.Minus90 which represents a left turn."
     */
    public turnLeft(): void {
        this.turn(TurnAngleEnum.Minus90);
    }

    /**
     * @name turnRight()
     * @description "This function rotates the object 90 degrees to the right.
     * It does this by calling the turn() function with the argument TurnAngleEnum.Plus90 which represents a right turn. "
     */
    public turnRight(): void {
        this.turn(TurnAngleEnum.Plus90);
    }

    /**
     * @description "This function returns an object with the current position and direction of the object.
     * it returns an IOrientation object with 'position' property which is the current position of the object obtained by calling getCurrentPosition()
     * and 'direction' property which is the current direction of the object obtained by calling getCurrentDirection()."
     */
    public getCurrentOrientation(): IOrientation {
        return {
            position: this.getCurrentPosition(),
            direction: this.getCurrentDirection(),
        };
    }


    /**
     * @name peekNextPosition()
     * @description "This function returns the next position of an object based on the current position
     * and the current movement of two toys, one for horizontal movement and one for vertical movement.
     * The function first assigns the current step of each toy to a variable (currentHorizontalStep and currentVerticalStep).
     * Then, it checks which of the two toys is active and whether it is moving forward or backward, and increments or decrements the corresponding step variable accordingly.
     * Finally, the function returns an object with properties x and y representing the new position."
     * @returns IPosition
     */
    public peekNextPosition(): IPosition {
        let currentHorizontalStep = this._horizontalMovementToy.currentStep();
        let currentVerticalStep = this._verticalMovementToy.currentStep();

        this._activeToy === this._horizontalMovementToy
            ? this._activeToy.currentMovement() === ToyMovementEnum.Backward
                ? --currentHorizontalStep
                : ++currentHorizontalStep
            : this._activeToy.currentMovement() === ToyMovementEnum.Backward
                ? --currentVerticalStep
                : ++currentVerticalStep;
        return {
            x: currentHorizontalStep,
            y: currentVerticalStep,
        };
    }

    /**
     *
     * @param degree
     * @private
     * @description "
     * This function  changes the direction of an object by rotating it by a certain degree (either 90 degrees clockwise or counter-clockwise).
     * The function takes an argument degree which is an enumeration value (TurnAngleEnum) which can be either Minus90 or other value.
     * It first initializes a variable nextMode to determine the next direction of movement. If the degree is Minus90,
     * it checks the current direction of the object (by calling the getCurrentDirection() method) and assigns the next mode of movement to nextMode accordingly.
     * If the current direction is North or West, it sets the next mode to ToyMovementEnum.Backward, otherwise it sets it to ToyMovementEnum.Forward.
     * The function then switches the active toy by calling switchToy() method, and changes the movement of the active toy to the value of nextMode by calling changeMovement(nextMode) method.
     * "
     */
    private turn(degree: TurnAngleEnum): void {
        let nextMode;

        if (degree === TurnAngleEnum.Minus90) {
            nextMode =
                this.getCurrentDirection() === CompassDirectionEnum.North ||
                this.getCurrentDirection() === CompassDirectionEnum.West
                    ? ToyMovementEnum.Backward
                    : ToyMovementEnum.Forward;
        } else {
            nextMode =
                this.getCurrentDirection() === CompassDirectionEnum.North ||
                this.getCurrentDirection() === CompassDirectionEnum.West
                    ? ToyMovementEnum.Forward
                    : ToyMovementEnum.Backward;
        }

        this.switchToy();
        this._activeToy.changeMovement(nextMode);
    }


    /**
     *
     * @private
     * @description "
     * This function switches the active toy of an object.
     * It simply checks the current active toy, which is stored in the instance variable _activeToy, and assigns the opposite toy to it.
     * If _activeToy is equal to _verticalMovementToy, it sets it to _horizontalMovementToy and vice versa. This method does not take any arguments, and it returns nothing.
     * It simply switches the active toy that the object is currently using to move
     * "
     */
    private switchToy(): void {
        this._activeToy =
            this._activeToy === this._verticalMovementToy
                ? this._horizontalMovementToy
                : this._verticalMovementToy;
    }

    /**
     *
     * @private
     * @description "
     * This function appears to be a method that returns the current position of an object.
     * It returns an object with properties x and y representing the current position.
     * The x value is obtained by calling the currentStep() method of the _horizontalMovementToy toy and
     * the y value is obtained by calling the currentStep() method of the _verticalMovementToy toy. This method does not take any arguments,
     * and it simply returns the current position of an object by reading the current step of the two toys that control the horizontal and vertical movement.
     * "
     */
    private getCurrentPosition(): IPosition {
        return {
            x: this._horizontalMovementToy.currentStep(),
            y: this._verticalMovementToy.currentStep(),
        };
    }


    /**
     *
     * @private
     * @description "
     * This function appears to be a method that returns the current direction of an object.
     * The method determines the current direction by checking the active toy,
     * which is stored in the instance variable _activeToy, and the current movement of that toy.
     * If the active toy is _verticalMovementToy, it checks whether the current movement is ToyMovementEnum.Forward or ToyMovementEnum.Backward,
     * and returns CompassDirectionEnum.North or CompassDirectionEnum.South accordingly. If the active toy is _horizontalMovementToy,
     * it checks whether the current movement is ToyMovementEnum.Forward or ToyMovementEnum.Backward, and returns CompassDirectionEnum.East or CompassDirectionEnum.West accordingly.
     * If the active toy is not any of the two defined toys, it returns CompassDirectionEnum.North as a default.
     * "
     */
    private getCurrentDirection(): CompassDirectionEnum {
        if (this._activeToy === this._verticalMovementToy) {
            return this._activeToy.currentMovement() === ToyMovementEnum.Forward
                ? CompassDirectionEnum.North
                : CompassDirectionEnum.South;
        } else if (this._activeToy === this._horizontalMovementToy) {
            return this._activeToy.currentMovement() === ToyMovementEnum.Forward
                ? CompassDirectionEnum.East
                : CompassDirectionEnum.West;
        } else {
            return CompassDirectionEnum.North;
        }
    }
}
