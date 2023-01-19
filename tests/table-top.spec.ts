import Tabletop from "../src/helpers/table-top";

/**
 * @description "
 * This is a unit test function that tests if a given position is within the tabletop.
 * It creates a new instance of the Tabletop class, passing the dimensions of the table (5 rows and 5 columns) as arguments.
 * Then it calls the contains() method of the Tabletop object passing a position object { x: 1, y: 2 } as argument.
 * It then asserts that the contains() method returns true indicating that the position object is within the tabletop.
 * This test is checking that the contains() method is correctly determining if a given position is within the tabletop or not.
 * "
 */
test("position within tabletop", () => {
    const tabletop = new Tabletop({
        rows: 5,
        columns: 5,
    },[{x : 1, y : 1},{ x : 1, y : 4}]);
    expect(tabletop.contains({ x: 1, y: 2 })).toBe(true);
});

/**
 * @description "
 * This is a unit test function that tests if a given position is outside the tabletop.
 * It creates a new instance of the Tabletop class, passing the dimensions of the table (5 rows and 5 columns) as arguments.
 * Then it calls the contains() method of the Tabletop object passing a position object { x: 6, y: 2 } as argument.
 * It then asserts that the contains() method returns false indicating that the position object is outside the tabletop.
 * This test is checking that the contains() method is correctly determining if a given position is outside the tabletop or not.
 * "
 */
test("position outside tabletop", () => {
    const tabletop = new Tabletop({
        rows: 5,
        columns: 5,
    },[{x : 1, y : 1},{ x : 1, y : 4}]);
    expect(tabletop.contains({ x: 6, y: 2 })).toBe(false);
});