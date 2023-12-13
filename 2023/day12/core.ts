import {parseRecordSolutionSymbols, RecordInput, RecordSolution} from "./types";
import {arrayEqual} from "../common";

export function generateStates(input: RecordInput, groupings: number[]){
	const onlyUnknowns = input.filter(x => x === "?");
	const n = onlyUnknowns.length;
	let corrects = 0;

	const maxDecimal = parseInt("1".repeat(onlyUnknowns.length),2);
	for(let i = 0; i <= maxDecimal; i++){
		const maybeSolution = i.toString(2).padStart(n,'0')
			.replace(new RegExp("0", "g"), ".",)
			.replace(new RegExp("1", "g"), "#",)
			.split("")

		let canditateSolution = [...input];
		for (const element of maybeSolution) {
			canditateSolution[canditateSolution.indexOf("?")] = parseRecordSolutionSymbols(element);
		}

		if (!checkIsCorrectSolution(canditateSolution.map(x => parseRecordSolutionSymbols(x)), groupings))
			continue;
		corrects++;
	}
	
	return corrects;
}

export const checkIsCorrectSolution = (solutionCandidate: RecordSolution, groupings: number[]): boolean => {
	const solutionGroupingsWithZeros: number[] = [];
	let count = 0;
	for (const element of solutionCandidate) {
		if (element === ".") {
			solutionGroupingsWithZeros.push(count);
			count = 0;
		}
		if (element === "#") {
			count++;
		}
	}
	solutionGroupingsWithZeros.push(count);
	
	const solutionGroupings = solutionGroupingsWithZeros.filter(x => x !== 0);
	return arrayEqual(solutionGroupings, groupings);
}