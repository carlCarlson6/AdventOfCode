import { readFileSync } from "fs";
import { Submarine1, Submarine2 } from "./submarine";

interface Command {
    commandName: string,
    increment: number
}

const readInput = (): Command[] => {
    const file = readFileSync('./day2/input.txt', 'utf-8');
    const input = file.split('\n').map(inputString => inputString.split(' '));
    return input.map(i => ({
        commandName: i[0],
        increment: Number(i[1])
    }));
}


const commands = readInput();
const submarine1 = new Submarine1();
const submarine2 = new Submarine2();

commands.forEach(command => {
    submarine1.executeCommand(command.commandName, command.increment);
    submarine2.executeCommand(command.commandName, command.increment);
});

console.log(submarine1.result);
console.log(submarine2.result);