type RecordInputSymbols = "?" | RecordSolutionSymbols; 
type RecordSolutionSymbols = "." | "#";

export type RecordInput = RecordInputSymbols[]; 

export type SpringRecord = {
	groupings: number[],
	input: RecordInput, 
}

export type RecordSolution = RecordSolutionSymbols[];

export const parseRecordInputSymbols = (value: string) => {
	if (value === "?" || value === "." || value === "#") return value;
	throw new Error("invalid value");
}

export const parseRecordSolutionSymbols = (value: string) => {
	if (value === "." || value === "#") return value;
	throw new Error("invalid value");
}