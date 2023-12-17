import {countAllUniquelyEnergizedTiles, EnergizedTiles, parseContraptionMap} from "./types";
import {readDataLines} from "../common";
import {runContraption} from "./contraption";

const day = 16;

console.log(`DAY ${day}`);
console.log("------------------------");

console.log("sample part 1");
const sampleLines = readDataLines(day, "sample1");
const sampleContraptionMap = parseContraptionMap(sampleLines);

const initialBeam  = {
	position:  {x: 0, y: 0},
	direction: {x: 1, y: 0}
};
const beams = [initialBeam];
const energelizedTiles: EnergizedTiles = [];

do {
	const beam = beams.pop();
	if (!beam) break;
	const {tiles, newBeams} = runContraption(sampleContraptionMap, beam);
	energelizedTiles.push(...tiles);
	beams.push(...newBeams);
} while (beams.length > 0)

console.log(countAllUniquelyEnergizedTiles(energelizedTiles));