import {readDataLines, validateSample} from "../common";
import {solvePart1, solvePart2} from "./solution";

console.log("DAY 2");
console.log("------------------------");

validateSample(solvePart1(readDataLines(2, 'sample1')), 8);
const part1solution = solvePart1(readDataLines(2, 'full'));
console.log("solution for part 1 is", part1solution, "is ok?", 2776 === part1solution);

validateSample(solvePart2(readDataLines(2, 'sample1')), 2286);
const part2solution = solvePart2(readDataLines(2, 'full'));
console.log("solution for part 2 is", part2solution, "is ok?", 68638 === part2solution);