
/**
 * @enum{'FORWARD' | 'BACKWARD'}
 * @description "Movement instruction for the motor"
 */
export enum ToyMovementEnum {
    Forward = "FORWARD",
    Backward = "BACKWARD",
}

/**
 * @enum{'LEFT' | 'RIGHT'}
 * @description "The expected direction the move toward, either LEFT or RIGHT"
 */
export enum TurnAngleEnum{
    Minus90 = "LEFT",
    Plus90 = "RIGHT",
}


/**
 * @enum{'NORTH' | 'EAST' | 'SOUTH' | 'WEST'}
 * @description "Coordinate pointer of compass."
 */
export enum CompassDirectionEnum {
    North = "NORTH",
    East = "EAST",
    South = "SOUTH",
    West = "WEST",
}

/**
 * @enum{'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT'}
 * @description "Terminal commands that would be expected and accepted"
 */
export enum CommandTypeEnum {
    Place = "PLACE",
    Move = "MOVE",
    TurnLeft = "LEFT",
    TurnRight = "RIGHT",
    ReportStatus = "REPORT",
}
