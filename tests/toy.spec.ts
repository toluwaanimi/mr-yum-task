import Toy from "../src/helpers/toy";
import {ToyMovementEnum} from "../src/enum";


/**
 * @description "
 * This is a unit test function that tests the initial settings of the toy.
 * It creates a new instance of the Toy class, which implements the toy.
 * Then it asserts that the current step of the toy is 0 using the currentStep() method of the toy.
 * It also asserts that the current movement of the toy is "ToyMovementEnum.Forward" using the currentMovement() method of the toy.
 * This test is checking that the toy is created in the correct state, and that the properties of the object are set to the expected values.
 * "
 */
test("initial toy settings", () => {
    const toy = new Toy();
    expect(toy.currentStep()).toEqual(0);
    expect(toy.currentMovement()).toEqual(ToyMovementEnum.Forward);
});

/**
 * @description "
 * This is a unit test function that tests the setting of the toy direction to forward.
 * It creates a new instance of the Toy class, which implements the toy.
 * Then it calls the changeMovement() method on the toy object, passing the value ToyMovementEnum.Forward as an argument.
 * It then asserts that the current movement of the toy is "ToyMovementEnum.Forward" using the currentMovement() method of the toy.
 *
 * This test is checking that the changeMovement() method is correctly setting the toy's movement direction to forward, and that the currentMovement property of the object is set to the expected value.
 * "
 */
test("set toy direction to forward", () => {
    const toy = new Toy();
    toy.changeMovement(ToyMovementEnum.Forward);
    expect(toy.currentMovement()).toEqual(ToyMovementEnum.Forward);
});

/**
 * @description "
 * This is a unit test function that tests the setting of the toy direction to backward.
 * It creates a new instance of the Toy class, which implements the toy.
 * Then it calls the changeMovement() method on the toy object, passing the value ToyMovementEnum.Backward as an argument.
 * It then asserts that the current movement of the toy is "ToyMovementEnum.Backward" using the currentMovement() method of the toy.
 *
 * This test is checking that the changeMovement() method is correctly setting the toy's movement direction to backward, and that the currentMovement property of the object is set to the expected value.
 * "
 */
test("set toy direction to backward", () => {
    const toy = new Toy();
    toy.changeMovement(ToyMovementEnum.Backward);
    expect(toy.currentMovement()).toEqual(ToyMovementEnum.Backward);
});

/**
 * @description "
 * This is a unit test function that tests the forward movement of the toy by one step.
 * It creates a new instance of the Toy class, which implements the toy.
 * Then it calls the step() method on the toy object, passing the value 1 as an argument.
 * It then asserts that the current step of the toy is 1 using the currentStep() method of the toy.
 *
 * This test is checking that the step() method is correctly moving the toy forward by 1 step and that the currentStep property of the object is set to the expected value.
 * "
 */
test("toy movement forward one step", () => {
    const toy = new Toy();
    toy.step(1);
    expect(toy.currentStep()).toEqual(1);
});

/**
 * @description "
 * This is a unit test function that tests the backward movement of the toy by one step.
 * It creates a new instance of the Toy class, which implements the toy.
 * Then it calls the changeMovement() method on the toy object, passing the value ToyMovementEnum.Backward as an argument.
 * Then it calls the step() method on the toy object, passing the value 1 as an argument.
 * It then asserts that the current step of the toy is -1 using the currentStep() method of the toy.
 *
 * This test is checking that the changeMovement() method is correctly setting the toy's movement direction to backward,
 * and the step() method is correctly moving the toy backward by 1 step and that the currentStep property of the object is set to the expected value.
 * "
 */
test("toy movement backward one step", () => {
    const toy = new Toy();
    toy.changeMovement(ToyMovementEnum.Backward);
    toy.step(1);
    expect(toy.currentStep()).toEqual(-1);
});
