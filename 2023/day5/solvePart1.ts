import {Almanac, Seed, almanacMapIds, readData} from "./core";

const readSeeds = (lines: string[]) => lines[0]
	.replace("seeds: ", "")
	.split(" ")
	.map(x => Number.parseInt(x));

export const findSeedLocationPart1 = (seed: Seed, almanac: Almanac) => {
	let current = seed;
	for (const almanacMapId of almanacMapIds) {
		const maps = almanac.find(x => x.id === almanacMapId)!.maps;
		const map = maps.find(x => x.sourceStart <= current && current <= x.sourceEnd);
		if (!map) continue;

		const diff = current - map.sourceStart;
		current = map.destinationStart + diff;
	}
	return current;
}

export const solvePart1 = (lines: string[]) => {
	const {seeds, almanac} = readData(lines, readSeeds);
	return seeds
		.map(seed => findSeedLocationPart1(seed, almanac))
		.sort((a, b) => a - b)[0];
}