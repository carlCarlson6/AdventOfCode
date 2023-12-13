import {generateStates} from "./core";
import { parseRecordInputSymbols } from "./types";

export const parseSpringRecords = (data: string[]) => data.map(line => {
	const split = line.split(" ");
	return {
		groupings: split[1].split(",").map(x => Number.parseInt(x)),
		input: split[0].split("").map(x => parseRecordInputSymbols(x))
	}
});

export const solveProblemPart1 = (data: string[]): number => {
	throw new Error("not implemented");
}