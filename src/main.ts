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
    private simulator: Simulator = new Simulator(
        new Robot(
            new Tabletop({
                rows: 5,
                columns: 5,
            })
        )
    );

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

    public start(): void {
        console.clear();

        commandParser.parse(process.argv);
    }

    private async startAutomatedMode(filename: string) {
        const fileStream = fs.createReadStream(filename);

        const terminal = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of terminal) {
            console.log(line);
            this.processCommand(line);
        }
    }

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