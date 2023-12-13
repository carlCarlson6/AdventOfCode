import {Pattern, Patterns} from "./core";

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
	throw new Error("not implemented");
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
	throw new Error("not implemented");
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