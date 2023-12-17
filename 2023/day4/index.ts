import {readDataLines, validateSample } from "../common";
import {solvePart1, solvePart2} from "./solution";

console.log("DAY 4");
console.log("------------------------");

console.log("sample part 1");
validateSample(solvePart1(readDataLines(4, 'sample1')), 13);
const part1solution = solvePart1(readDataLines(4, 'full'));
console.log("solution for part 1 is", part1solution, "is ok?", 15205 === part1solution);

console.log("sample part 2");
validateSample(solvePart2(readDataLines(4, 'sample1')), 30);
//console.log("executiong solution part 2");
//const part2solution = solvePart2(readDataLines(4, 'full'));
//console.log("solution for part 2 is", part2solution, "is ok?", 0 === part2solution);