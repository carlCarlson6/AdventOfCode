import {generateStates} from "./core";
import {parseSpringRecords} from "./solveProblemPart1";
import { parseRecordInputSymbols } from "./types";

const parseUnfoldedSpringRecords = (data: string[]) => parseSpringRecords(data)
	.map(record => ({
		groupings: [
			...record.groupings,
			...record.groupings,
			...record.groupings,
			...record.groupings,
			...record.groupings
		],
		input: [
			...record.input, '?',
			...record.input, '?',
			...record.input, '?',
			...record.input, '?',
			...record.input,
		].map(x => parseRecordInputSymbols(x)),
	}));

export const solveProblemPart2 = (data: string[]) => {
	throw new Error("not implemented");
}