import {readDataLines, validateSample } from "../common";
import { solveProblem } from "./core";

const day = 11;

console.log("DAY 11");
console.log("------------------------");

console.log("sample part 1");
validateSample(solveProblem(readDataLines(day, 'sample1'), 1), 374);

const solutionPart1 = solveProblem(readDataLines(11, 'full'), 1);
console.log("solution for part 1 is", solutionPart1, "is ok?", 9521550 === solutionPart1);

const solutionPart2 = solveProblem(readDataLines(11, 'full'), 999_999);
console.log("solution for part 2 is", solutionPart2, "is ok?", 298932923702 === solutionPart2);