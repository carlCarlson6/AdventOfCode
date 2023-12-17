import {readDataLines, validateSample} from "../common";
import {solvePart1, solvePart2} from "./solution";

console.log("DAY 1");
console.log("------------------------");

validateSample(solvePart1(readDataLines(1, 'sample1')), 142);
const firstPartSolution = solvePart1(readDataLines(1, 'full'));
console.log("solution for part 1 is", firstPartSolution, "is ok?", 55130 === firstPartSolution);

validateSample(solvePart2(readDataLines(1, 'sample2')), 281);
const secondPartSolution = solvePart2(readDataLines(1, 'full'));
console.log("solution for part 2 is", secondPartSolution, "is ok?", 54985 === secondPartSolution);