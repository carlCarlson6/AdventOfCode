import {readDataLines, validateSample} from "../common";
import {solvePart1} from "./solvePart1";
import {solvePart2} from "./solvePart2";

const day = 5;

console.log("DAY 5");
console.log("------------------------");

console.log("sample part 1");
validateSample(solvePart1(readDataLines(day, 'sample1')), 35);
const part1solution = solvePart1(readDataLines(day, 'full'));
console.log("solution for part 1 is", part1solution, "is ok?", 382895070 === part1solution);

console.log("sample part 1");
validateSample(solvePart2(readDataLines(day, 'sample1')), 46);
const part2solution = solvePart2(readDataLines(day, 'full'));
console.log("solution for part 2 is", part2solution, "is ok?", 0 === part2solution);