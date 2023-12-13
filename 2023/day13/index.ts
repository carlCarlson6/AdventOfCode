import {readDataLines, validateSample} from "../common";
import {solveProblemPart1} from "./solution";

const day = 12;

console.log("DAY 11");
console.log("------------------------");

console.log("sample part 1");
validateSample(solveProblemPart1(readDataLines(day, 'sample1')), 21);