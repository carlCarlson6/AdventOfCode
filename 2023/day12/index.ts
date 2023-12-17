import {readDataLines, validateSample } from "../common";

import {solveProblemPart1} from "./solveProblemPart1";
import {solveProblemPart2} from "./solveProblemPart2";


const day = 12;

console.log("DAY 12");
console.log("------------------------");

console.log("sample part 1");
validateSample(solveProblemPart1(readDataLines(day, 'sample1')), 21);
const solutionPart1 = solveProblemPart1(readDataLines(day, 'full'));
console.log("solution for part 1 is", solutionPart1, "is ok?", 7792 === solutionPart1);

console.log("sample part 2");
validateSample(solveProblemPart2(readDataLines(day, 'sample1')), 525152);
const solutionPart2 = solveProblemPart2(readDataLines(day, 'full'));
console.log("solution for part 2 is", solutionPart2, "is ok?", 0 === solutionPart1);