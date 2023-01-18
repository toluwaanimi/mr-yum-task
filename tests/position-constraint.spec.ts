import {PositionConstraint} from "../src/helpers/position-constraint";

test("position is within the expected constraint", () => {
    const positionConstraint = PositionConstraint.create(
        { x: 0, y: 0 },
        { x: 4, y: 4 }
    );
    expect(positionConstraint.contains({ x: 1, y: 2 })).toBe(true);
});

test("position is not within the expected constraint", () => {
    const positionConstraint = PositionConstraint.create(
        { x: 0, y: 0 },
        { x: 4, y: 4 }
    );
    expect(positionConstraint.contains({ x: 1, y: 5 })).toBe(false);
});
