import Robot from "../src/helpers/robot";
import Tabletop from "../src/helpers/table-top";
import {CompassDirectionEnum} from "../src/enum";


/**
 * @description "
 * unit test function that tests the initial status of the robot when it is created.
 * It creates a new instance of the Robot class, passing a new instance of the Tabletop class as an argument.
 * Then it asserts that the x and y properties of the position object returned by the getCurrentOrientation() method of the robot object are equal to 0.
 * It also asserts that the direction returned by the getCurrentOrientation() method of the robot object is equal to CompassDirectionEnum.North.
 * This test is checking that the Robot class is correctly initializing the position and direction of the robot when it is created.
 * "
 */
test("initial status of robot", () => {
    const robot = new Robot(new Tabletop({ rows: 5, columns: 5 }));
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(0);
    expect(robot.getCurrentOrientation().direction).toEqual(
        CompassDirectionEnum.North
    );
});

/**
 * unit test function that tests the movement of the robot when it moves forward.
 * It creates a new instance of the Robot class, passing a new instance of the Tabletop class as an argument.
 * Then it calls the step() method of the robot object with 1 as an argument.
 * Then it asserts that the x property of the position object returned by the getCurrentOrientation() method of the robot object is equal to 0 and the y property is equal to 1.
 * This test is checking that the step() method is correctly updating the position of the robot in the y-axis when it moves forward.
 * It is also checking that the x coordinate is not changing when the robot moves forward.
 */
test("robot movement forward", () => {
    const robot = new Robot(new Tabletop({ rows: 5, columns: 5 }));
    robot.step(1);
    expect(robot.getCurrentOrientation().position.x).toEqual(0);
    expect(robot.getCurrentOrientation().position.y).toEqual(1);
});

/**
 * @description "
 * the test case is testing the robot's ability to move backwards after performing a 180-degree turn by calling turnLeft() twice.
 * It then expects the robot's position to be at (0,1) after moving backwards. It is important to note that this test case assumes that the turnLeft()
 * and step() functions are implemented and working correctly.
 * "
 */
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

/**
 * @description "
 * This test is checking the robot's left turn movement. It creates a robot instance on a 5x5 tabletop, moves the robot one step forward, and then performs a left turn.
 * The test then asserts that the robot's position is (0,1) and its direction is West.
 * The next step is that robot performs another left turn and moves forward again, the test asserts that the robot's position should be (0,0) and its direction should be South.
 * Then again two left turns are performed and the test asserts that the direction should be East and North respectively.
 * This test is to ensure that the robot's left turn is working as expected, and that the robot's position and direction are updated correctly with each left turn.
 * "
 */
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

/**
 * @description "
 * This test case is testing the robot's right turn movement.
 * It creates a new robot instance with a tabletop of 5x5, makes the robot take one step forward, then turns the robot right.
 * It then checks that the robot's position and direction are correct. Next, it turns the robot right again and takes another step,
 * and checks that the robot's position and direction are correct once again.
 * This test case is ensuring that the robot's right turn movement is working correctly and that the robot's position and direction are updated correctly after taking a step and turning right.
 * "
 */
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

/**
 * @description "
 * This test is checking that the robot's reset method properly sets the robot's position
 * and direction back to the default values of 0,0 and North, respectively.
 * It first moves the robot forward one step and turns it to the right,
 * then checks that the x and y position and direction are as expected.
 * Next, it turns the robot to the right again, and then calls the reset method,
 * and checks that the x, y position and direction are now back to their default values.
 * "
 */
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

/**
 * @description "
 * This test is checking the proper functionality of the robot's orientation.
 * It creates a new Robot instance and places it on a Tabletop with 5 rows and 5 columns.
 * It then moves the robot forward by two steps and turns it to the right.
 * The test then asserts that the robot's current position is (0,2) and its direction is East,
 * which should be the expected outcome after these actions. This test is checking if the robot's movement and rotation functionalities are working correctly.
 * "
 */
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
