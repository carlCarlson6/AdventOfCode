export const almanacMapIds = [
	"seed-to-soil",
	"soil-to-fertilizer",
	"fertilizer-to-water",
	"water-to-light",
	"light-to-temperature",
	"temperature-to-humidity",
	"humidity-to-location"
] as const;
export type AlmanacMapId = typeof almanacMapIds[number];

export type AlmanacMap = {
	id: AlmanacMapId,
	maps: Map[],
}

export type Map = {
	sourceStart: number,
	sourceEnd: number,
	destinationStart: number
}

export type Almanac = AlmanacMap[];

export type Seed = number;
export type Range = number;
export type Seeds = Seed[];
export type SeedRange = [Seed, Range]
export type SeedsRanges = SeedRange[];

export const readData = <T>(lines: string[], readSeeds: (lines: string[]) => T) => ({
	seeds: readSeeds(lines),
	almanac: buildAlmanac(lines),
})

const buildAlmanac = (lines: string[]) => {
	const almanac: Almanac = []
	for (const almanacMapId of almanacMapIds) {
		const startLineIdx = [...lines].findIndex(x => x.startsWith(almanacMapId));
		const spliced = [...lines].splice(startLineIdx+1);

		const maps: Map[] = [];
		for (const splicedLine of spliced) {
			if(splicedLine === "")
				break;

			const values = splicedLine.split(" ").map(x => Number.parseInt(x));
			const range = values[2];

			const destinationStart = values[0];
			//const destinationRangeEnd = values[0]+range;

			const sourceStart = values[1];
			const sourceEnd = values[1]+range;

			maps.push({sourceStart, sourceEnd, destinationStart,})
		}
		almanac.push({id: almanacMapId, maps});
	}
	return almanac;
}