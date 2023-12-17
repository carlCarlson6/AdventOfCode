import { readFileSync } from 'fs';

export const readDataLines = (day: number, file: 'full' | 'sample1' | 'sample2') =>
  readFileSync(`./day${day}/data/${file}.txt`, 'utf8')
  .split(/\r?\n|\r|\n/g);

export const validateSample = (answer: number, expected: number) => {
  const isOk = answer === expected;
  console.log("answer for sample is", isOk);
};

export const isNumber = (str: string) => /^\d+$/.test(str)

export const arrayEqual = <T>(a: T[], b: T[]) =>
  Array.isArray(a) &&
	Array.isArray(b) &&
	a.length === b.length &&
	a.every((val, index) => val === b[index]);

export const transposeMatrix = <T>(matrix: T[][]) =>
  matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));