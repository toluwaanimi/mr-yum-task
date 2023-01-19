import {PositionConstraint} from "../src/helpers/position-constraint";

/**
 * @description "
 * unit test function that is checking if the position is within the expected constraint.
 * It creates a new instance of PositionConstraint class using the create() method. It passes two objects as arguments, the first one representing the starting point and the second one representing the ending point.
 * This method creates a new instance of PositionConstraint class with the given starting point and ending point, so that it can be used to check if a given point is within the constraint.
 *
 * It then calls the contains() method on the positionConstraint object and passing an object that represents a point as an argument.
 * The contains method is supposed to check if a point is within the constraint and returns a boolean value. It then asserts that the returned value should be true.
 *
 * this test is checking if the point (1,2) is within the constraint (0,0) and (4,4) and it is expected to return true.
 * "
 */
test("position is within the expected constraint", () => {
    const positionConstraint = PositionConstraint.create(
        { x: 0, y: 0 },
        { x: 4, y: 4 }
    );
    expect(positionConstraint.contains({ x: 1, y: 2 })).toBe(true);
});

/**
 * @description "
 * This is also a unit test function that is checking if the position is not within the expected constraint. It creates a new instance of PositionConstraint class using the create() method.
 * It passes two objects as arguments, the first one representing the starting point and the second one representing the ending point.
 * This method creates a new instance of PositionConstraint class with the given starting point and ending point, so that it can be used to check if a given point is within the constraint.
 *
 * It then calls the contains() method on the positionConstraint object and passing an object that represents a point as an argument.
 * The contains method is supposed to check if a point is within the constraint and returns a boolean value. It then asserts that the returned value should be false.
 *
 * this test is checking if the point (1,5) is within the constraint (0,0) and (4,4) and it is expected to return false, since the point is outside the constraint.
 * "
 */
test("position is not within the expected constraint", () => {
    const positionConstraint = PositionConstraint.create(
        { x: 0, y: 0 },
        { x: 4, y: 4 }
    );
    expect(positionConstraint.contains({ x: 1, y: 5 })).toBe(false);
});
