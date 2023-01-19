import Simulator from "./helpers/simulator";
import Robot from "./helpers/robot";
import Tabletop from "./helpers/table-top";
import * as fs from "fs";
import * as readline from "readline";
import {CompassDirectionEnum} from "./enum";
import commandParser from "commander";


/**
 * @class Runner
 * @description "Main runner class to start the application"
 */
class Runner {
    /**
     *
     * @private
     * @description "
     * This line of code creates an instance of a class called Simulator and assigns it to an instance variable simulator.
     * The Simulator class is being instantiated with a new instance of Robot class as its argument, which in turn is being instantiated with a new instance of Tabletop class as its argument.
     *
     * The Tabletop class takes an object with properties rows and columns as its argument, in this case, it is {rows: 5, columns: 5}.
     *
     * It appears that the Simulator class is used to simulate the movement of a robot on a tabletop,
     * and the Robot class is used to represent the robot, and the Tabletop class is used to represent the table-top on which the robot moves.
     * The Tabletop class is being initialized with the number of rows and columns, which defines the size of the tabletop.
     * "
     */
    private simulator: Simulator = new Simulator(
        new Robot(
            new Tabletop({
                rows: 5,
                columns: 5,
            },[{x : 1, y : 1},{ x : 1, y : 4}])
        )
    );

    /**
     * @description "
     * This is the constructor of a class. It configures a command line interface (CLI) using the commander library.
     * The arguments() method is used to specify that the command can take an optional argument [filename].
     * The description() method is used to provide a brief description of the command and specify the purpose of the filename argument.
     *
     * The action() method is used to specify the behavior of the command. It takes a callback function that is executed when the command is run.
     * The callback function checks if a filename was passed as an argument to the command. If a filename is passed, the startAutomatedMode(filename) method is called with the filename as an argument.
     * If no filename is passed, the startInteractiveMode() method is called.
     *
     * It provides a CLI that allows the user to either run the program in an automated mode where commands are read from a file or in an interactive mode where commands are entered by the user.
     * "
     */
    constructor() {

        commandParser
            .arguments("[filename]")
            .description("Test robot using file data or user input.", {
                filename: "File where test data is stored",
            })
            .action(async (filename: string) => {
                if (filename) {
                    await this.startAutomatedMode(filename);
                } else {
                    this.startInteractiveMode();
                }
            });
    }

    /**
     * @description "
     * This function starts the command line interface (CLI) of the class.
     * It first calls the console.clear() method which clears the console. This is used to clear the console before starting the CLI.
     *
     * Then it calls the parse() method on the commandParser object, passing the process.argv array as an argument. process.argv is a property of the process global object in Node.js,
     * which contains the command-line arguments passed when starting the script. parse() method is likely to parse the command-line arguments passed to the script,
     * and match them with the command and options that have been defined, and then execute the associated action.
     *
     * start() method is used to initiate the command-line interface of the class
     * "
     */
    public start(): void {
        console.clear();

        commandParser.parse(process.argv);
    }

    /**
     *
     * @param filename
     * @private
     * @description "
     * This function  starts the automated mode of the program. It takes one argument filename, which is a string representing the name of the file that contains the commands to be executed.
     *
     * It first creates a read stream using the fs (file system) module's createReadStream() method, passing filename as the argument. This allows to read the file line by line.
     *
     * It then creates an interface object using the readline module's createInterface() method, which is used to read the file line by line. The input option is set to the file stream, so that the interface reads from the file.
     * The crlfDelay option is set to Infinity, to ensure that the readline buffer is flushed immediately.
     *
     * The function then uses a for-await-of loop to iterate over each line in the file. Each line is logged to the console, and the processCommand(line) method is called with the current line as the argument.
     *
     * this method is used to process the commands from a file, one line at a time, and execute them.
     *
     * "
     *
     * @name startAutomatedMode(filename)
     */
    private async startAutomatedMode(filename: string) {
        const fileStream = fs.createReadStream(filename);

        const terminal = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of terminal) {
            console.log(line)
            this.processCommand(line);
        }
    }

    /**
     *
     * @private
     * @description "
     * This function starts the interactive mode of the program.
     * It creates an interface object using the readline module's createInterface() method, which is used to read from the process.stdin (standard input) and write to the process.stdout (standard output) streams.
     * The terminal option is set to false, it is likely to be used to configure the interface to not use a TTY (terminal) interface.
     *
     * It then defines a function prompt which calls the question() method on the terminal object, passing an empty string and a callback function as arguments.
     * The callback function is called each time the user enters a command in the terminal. The callback function takes the user's input (a string) as an argument,
     * and calls the processCommand(command) method with the user's input as the argument. The callback function is also calling the prompt() function recursively to keep the process running,
     * allowing the user to enter multiple commands.
     *
     * It then calls the prompt() function to start the prompt.
     *
     * this method is used to process the commands entered by the user in real-time, and execute them.
     * "
     */
    private startInteractiveMode() {
        console.log('Welcome to the Toy robot simulator (start typing commands below)');
        const terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });

        const prompt = () => {
            terminal.question("", (command: string) => {
                this.processCommand(command);
                prompt();
            });
        };

        prompt();
    }


    /**
     *
     * @param command : string
     * @private
     * @description "
     This function processes the commands passed to it. It takes one argument command which is a string representing the command that the user has entered.

     It first defines two regular expressions placeCommandParsingExpression and otherCommandParsingExpression that are used to match the different types of commands that the program supports.
     The first expression placeCommandParsingExpression is used to match the PLACE command and extract the x, y and direction values from the command.
     The second expression otherCommandParsingExpression is used to match the other commands (MOVE, LEFT, RIGHT, REPORT)

     It then calls the exec() method on each expression, passing the command as an argument. The exec() method returns an array containing the matched text and any capturing groups, or null if no match is found.
     It then checks if the placeCommandParameters or otherCommandParameters are not null. If placeCommandParameters are not null,
     it calls the simulator.run() method with an object that contains the name of the command, and the orientation parameters (x, y and direction) extracted from the command.
     If otherCommandParameters are not null, it calls the simulator.run() method with an object that contains the name of the command.
     This method is used to parse the command string and extract any necessary parameters, and then pass it to the simulator.run() method for execution.
     *
     */
    private processCommand(command: string): void {
        const placeCommandParsingExpression = /^(PLACE) (\d+),(\d+),(SOUTH|NORTH|WEST|EAST)$/gm;
        const placeCommandParameters = placeCommandParsingExpression.exec(command);

        const otherCommandParsingExpression = /^(MOVE|LEFT|RIGHT|REPORT)$/gm;
        const otherCommandParameters = otherCommandParsingExpression.exec(command);

        if (placeCommandParameters) {
            this.simulator.run({
                name: placeCommandParameters[1],
                orientation: {
                    position: {
                        x: Number(placeCommandParameters[2]),
                        y: Number(placeCommandParameters[3]),
                    },
                    direction: <CompassDirectionEnum>placeCommandParameters[4],
                },
            });
        } else if (otherCommandParameters) {
            this.simulator.run({
                name: otherCommandParameters[1],
            });
        }
    }
}


const app = new Runner();
app.start();