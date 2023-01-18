import Toy from "../src/helpers/toy";
import {MotorMovementEnum} from "../src/enum";


test("initial motor settings", () => {
    const motor = new Toy();
    expect(motor.currentStep()).toEqual(0);
    expect(motor.currentMovement()).toEqual(MotorMovementEnum.Forward);
});

test("set motor direction to forward", () => {
    const motor = new Toy();
    motor.changeMovement(MotorMovementEnum.Forward);
    expect(motor.currentMovement()).toEqual(MotorMovementEnum.Forward);
});

test("set motor direction to backward", () => {
    const motor = new Toy();
    motor.changeMovement(MotorMovementEnum.Backward);
    expect(motor.currentMovement()).toEqual(MotorMovementEnum.Backward);
});

test("motor movement forward one step", () => {
    const motor = new Toy();
    motor.step(1);
    expect(motor.currentStep()).toEqual(1);
});

test("motor movement backward one step", () => {
    const motor = new Toy();
    motor.changeMovement(MotorMovementEnum.Backward);
    motor.step(1);
    expect(motor.currentStep()).toEqual(-1);
});
