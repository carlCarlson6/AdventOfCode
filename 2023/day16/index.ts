import {parseContraptionMap} from "./types";
import {readDataLines} from "../common";
import {solveParte1} from "./solveParte1";

const day = 16;

console.log(`DAY ${day}`);
console.log("------------------------");

console.log("sample part 1");
solveParte1(parseContraptionMap(readDataLines(day, "sample1")))


