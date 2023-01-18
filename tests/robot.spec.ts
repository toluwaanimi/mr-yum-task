import Robot from "../src/helpers/robot";
import Tabletop from "../src/helpers/table-top";
import {CompassDirectionEnum} from "../src/enum";


test("initial status of robot", () => {
    const robot = new Robot(new Tabletop({ rows: 5, columns: 5 }));
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(0);
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.North
    );
});

test("robot movement forward", () => {
    const robot = new Robot(new Tabletop({ rows: 5, columns: 5 }));
    robot.step(1);
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(1);
});

test("robot movement backward", () => {
    const robot = new Robot(new Tabletop({ rows: 5, columns: 5 }));
    robot.step(2);
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(2);

    robot.turnLeft();
    robot.turnLeft();
    robot.step(1);
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(1);
});

test("robot left turn movement", () => {
    const robot = new Robot(new Tabletop({ rows: 5, columns: 5 }));
    robot.step(1);
    robot.turnLeft();
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(1);
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.West
    );

    robot.turnLeft();
    robot.step(1);
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(0);
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.South
    );

    robot.turnLeft();
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.East
    );

    robot.turnLeft();
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.North
    );
});

test("robot right turn movement", () => {
    const robot = new Robot(new Tabletop({ rows: 5, columns: 5 }));
    robot.step(1);
    robot.turnRight();
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(1);
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.East
    );

    robot.turnRight();
    robot.step(1);
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(0);
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.South
    );
});

test("robot reset", () => {
    const robot = new Robot(new Tabletop({ rows: 5, columns: 5 }));
    robot.step(1);
    robot.turnRight();
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(1);
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.East
    );

    robot.turnRight();
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.South
    );

    robot.reset();
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(0);
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.North
    );
});

test("robot orientation", () => {
    const robot = new Robot(new Tabletop({ rows: 5, columns: 5 }));
    robot.step(2);
    robot.turnRight();
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(2);
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.East
    );
});
