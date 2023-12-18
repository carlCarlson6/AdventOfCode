import {ContraptionMap, countAllUniquelyEnergizedTiles, EnergizedTiles} from "./types";
import {runContraption} from "./contraption";

export const solveParte1 = (map: ContraptionMap) => {
	const initialBeam = {
		position: {x: 0, y: 0},
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
}