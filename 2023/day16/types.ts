export type EnergizedTile = {
	x: number,
	y: number,
};

export type ContraptionTileSymbol = '.'|'|'|'-'|'\\'|'/'; 

export type ContraptionMap = ContraptionTileSymbol[][];

export type EnergizedTiles = EnergizedTile[];

export const countAllUniquelyEnergizedTiles = (energizedTiles: EnergizedTiles): number => energizedTiles
	.filter((value, index, array) => array
		.findIndex(element => element.x === value.x && element.y === value.y) === index)
	.length

export const parseContraptionMap = (dataLines: string[]) => dataLines
	.map(line => line
		.split('')
		.map(x => parseContraptionSymbol(x)))

const parseContraptionSymbol = (value: string) => {
	if (value === '.' || value === '-' || value === '|' || value === '/' || value === "\\") {
		return value;
	}
	throw new Error("invalid maze symbol");
}

