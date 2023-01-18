# 

## Documentation of MrYum Task

---

## Technologies

- Node JS
- Typescript
- Jest

---


The application is a simulation of a toy robot moving on a square table top, of dimensions 5 units x 5 units. There are no
other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented
from falling to destruction. Any movement that would result in the robot falling from the table must be prevented,
however further valid movement commands must still be allowed.

Create a console application that can read in commands of the following form -

```
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```

PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. The origin (0,0) can be considered to be the SOUTH WEST most corner. It is required that the first command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. Theapplication should discard all commands in the sequence until a valid PLACE command has been executed.MOVE will move the toy robot one unit forward in the direction it is currently facing.LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.Input can be from a file, or from standard input, as the developer chooses.

Provide test data to exercise the application.It is not required to provide any graphical output showing the movement of the toy robot.The application should handle error states appropriately and be robust to user input.

The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot. Any
move that would cause the robot to fall must be ignored.


## Examples

```
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
```

```
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST




## Start Development

Kindly clone the repository `https://github.com/toluwaanimi/mr-yum-task.git`

### Installation

To install the necessary packages, in your folder directory kindly run

```markdown
npm install

# or

yarn 
```

The program can be run in two modes:

1. `Interactive mode` where in the user can type in the commands. To run in interactive mode simply type `npm start`. Note that the application will run in watch mode by default. So press `Ctrl+C` to exit the application.

2. `Automated mode` where in the commands can be read from the file. To run in automated mode simply type with the filename for e.g. `npm start ./files/example.txt`. The application will run in watch mode by default. So press `Ctrl+C` to exit the application.



* To run your Test
    * ```markdown
      npm run test
         ```