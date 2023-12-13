import { randomUUID } from "crypto";

type Galaxy = {
	id: string;
	x: 	number;
	y: 	number;
}

type MapSymbol = "."|"#";

const parseGalaxyMap = (data: string[]): MapSymbol[][] => {
	const galaxiesAndMapSymbols = data.map((line, indexX) => line.split("").map((char, indexY) => {
		const mapSymbol = readMapSymbol(char);
		const galaxy: Galaxy = { id: randomUUID(), x: indexX, y: indexX }
		return { mapSymbol, galaxy };
	}));
	return galaxiesAndMapSymbols.map(x => x.map(y => y.mapSymbol));
}

const readMapSymbol = (value: string): MapSymbol => {
	if (value === "." || value === "#") return value;
	throw new Error("invalid symbol");
}

const addGravitationalExpansion = (skyMap: MapSymbol[][], expansionFactor: number): Galaxy[] => {
	const transposedSkyMap = transposeMatrix(skyMap);

	const galaxies: Galaxy[] = [];
	for(let i = 0; i < skyMap.length; i++) {
		const skyRow = skyMap[i];
		for(let j = 0; j < skyRow.length; j++) {
			const symbol = skyRow[j];
			if (symbol === "#")
				galaxies.push({id: randomUUID(), x: i,y: j})
		}
	}

	return galaxies
		.map(galaxy => {
			let correctedX = galaxy.x;
			for(let i = 0; i < skyMap.length; i++) {
				const row = skyMap[i];
				if (row.every(x => x === ".") && i < galaxy.x)
					correctedX = correctedX + expansionFactor;
			}
			return { ...galaxy, x: correctedX }
		})
		.map(galaxy => {
			let correctedY = galaxy.y;
			for(let i = 0; i < transposedSkyMap.length; i++) {
				const row = transposedSkyMap[i];
				if (row.every(x => x === ".") && i < galaxy.y)
					correctedY = correctedY + expansionFactor;
				}
			return { ...galaxy, y: correctedY }
		});
}
const getAllGalaxyPairs = (galaxies: Galaxy[]): [Galaxy, Galaxy][] => {
	const res: [Galaxy, Galaxy][] = [];
	const l = galaxies.length;
	for(let i=0; i<l; ++i)
		for(let j=i+1; j<l; ++j)
			res.push([galaxies[i], galaxies[j]]);
	return res;
}

const calculateShorPath = (a: Galaxy, b: Galaxy): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const transposeMatrix = <T>(matrix: T[][]) => matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

export const solveProblem = (data: string[], expansionFactor: number) => {
	const initialGalaxiesMap = parseGalaxyMap(data);
	const galaxies = addGravitationalExpansion(initialGalaxiesMap, expansionFactor);
	return getAllGalaxyPairs(galaxies)
		.map(p => calculateShorPath(p[0], p[1]))
		.reduce((a,b) => a+b);
}