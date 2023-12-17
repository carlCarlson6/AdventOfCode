export type PatternSymbol = '.'|'#';
export type Pattern = PatternSymbol[][];
export type Patterns = Pattern[];

export const parsePatternSymbols = (value: string) => {
	if (value === "." || value === "#") return value;
	throw new Error("invalid value");
}