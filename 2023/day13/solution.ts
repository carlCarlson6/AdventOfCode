import {parsePatternSymbols, Pattern, Patterns} from "./core";
import {arrayEqual, transposeMatrix} from "../common";

export const solveProblemPart1 = (data: string[]) => {
	const patterns = parsePatterns(data);
	const { horizontals, leftovers: leftoverFromHorizontal } = findHorizontalReflections(patterns);
	const { verticals, leftovers: totalLeftovers } = findVerticalReflections(leftoverFromHorizontal)
	
	if (totalLeftovers.length > 0) throw new Error("should not be any more leftover");
	
	const totalRowsAbove = horizontals.map(x => x.numberRowsAbove).reduce((a,b) => a+b);
	const totalColumnsToLeft = verticals.map(x => x.numberColumnsToLeft).reduce((a,b) => a+b)*100;
	
	return totalRowsAbove + totalColumnsToLeft;
}

const parsePatterns = (data: string[]): Patterns => {
	const patterns: Patterns = [];
	let pattern: Pattern = [];
	for (const line of data) {
		if (line === "") {
			patterns.push(pattern);
			pattern = [];
			continue;
		}
		pattern.push(line.split("").map(x => parsePatternSymbols(x)))
	}
	if (pattern.length !== 0)
		patterns.push(pattern);
	return patterns
}

const findHorizontalReflections = (patterns: Patterns): {
	horizontals: { numberRowsAbove: number }[],
	leftovers: Patterns
} => {
	const leftovers: Patterns = [];
	const horizontals: { numberRowsAbove: number }[] = [];
	
	for (const pattern of patterns) {
		const {thereIsPattern, numberRowsAbove} = findHorizontalReflection(pattern);
		if (!thereIsPattern) {
			leftovers.push(pattern);
			continue;
		}
		horizontals.push({numberRowsAbove})	
	}
	
	return {
		horizontals,
		leftovers,
	}
}

const findHorizontalReflection = (pattern: Pattern): {
	thereIsPattern: boolean,
	numberRowsAbove: number
} => {
	const transposedPattern = transposeMatrix(pattern);
	let count = 0;
	for(let i = 0; i < transposedPattern.length; i++) {
		const left = transposedPattern[i];
		if (i+1 >= transposedPattern.length) break;
		const right = transposedPattern[i+1];
		if (arrayEqual(left, right)) {
			count = i+1;
			break;
		}
	}

	return {
		thereIsPattern: count > 0,
		numberRowsAbove: count,
	}
}

const findVerticalReflections = (patterns: Patterns): {
	verticals: { numberColumnsToLeft: number }[],
	leftovers: Patterns
} => {
	const leftovers: Patterns = [];
	const verticals: { numberColumnsToLeft: number }[] = [];
	
	for (const pattern of patterns) {
		const {thereIsPattern, numberColumnsToLeft} = findVerticalReflection(pattern);
		if (!thereIsPattern) {
			leftovers.push(pattern);
			continue;
		}
		verticals.push({numberColumnsToLeft})	
	}
	
	return {
		verticals,
		leftovers,
	}
}

const findVerticalReflection = (pattern: Pattern): {
	thereIsPattern: boolean,
	numberColumnsToLeft: number
} => {
	throw new Error("not implemented");
	
}