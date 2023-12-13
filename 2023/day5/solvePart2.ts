import {SeedsRanges, readData, Almanac, SeedRange} from "./core";
import {findSeedLocationPart1} from "./solvePart1";

const readSeeds = (lines: string[]) => {
	const dataLine = lines[0]
		.replace("seeds: ", "")
		.split(" ")
		.map(x => Number.parseInt(x));
	const temp = dataLine.slice();
	const pairs: SeedsRanges = [];
	while (temp.length) {
		const spliced = temp.splice(0, 2)
		pairs.push([spliced[0], spliced[1]]);
	}
	return pairs;
}

const findSeedLocations = (seedRange: SeedRange, almanac: Almanac): number[] => {
	const locations: number[] = []
	for(let i = 0; i < seedRange[1]; i++) {
		const seed = seedRange[0] + i;
		locations.push(findSeedLocationPart1(seed, almanac));
	}
	
	return locations;
}

export const solvePart2 = (lines: string[]) => {
	const {seeds: seedRanges, almanac} = readData(lines, readSeeds);
	return seedRanges
		.flatMap(seedRange => findSeedLocations(seedRange, almanac))
		.sort((a, b) => a - b)[0];
}