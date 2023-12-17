import { isNumber, readDataLines, validateSample } from "../common";

const numbers = [
  { asInt: 1, asStr: 'one'   },
  { asInt: 2, asStr: 'two'   },
  { asInt: 3, asStr: 'three' },
  { asInt: 4, asStr: 'four'  },
  { asInt: 5, asStr: 'five'  },
  { asInt: 6, asStr: 'six'   },
  { asInt: 7, asStr: 'seven' },
  { asInt: 8, asStr: 'eight' },
  { asInt: 9, asStr: 'nine'  },
]

export const solvePart1 = (lines: string[]) => sumValues(lines
  .map(line => {
    const values: number[] = [];
    for (const character of line.split('')) {
      if(!isNumber(character)) continue;
      values.push(Number.parseInt(character));
    }
    return values;
  }))

export  const solvePart2 = (lines: string[]) => sumValues(lines
  .map(line => {
    const values: number[] = [];
    for (let index = 0; index < line.length; index++) {
      const element = line[index];
      if (isNumber(element)) {
        values.push(Number.parseInt(element));
      }
      else {
        numbers.forEach(number => {
          if (line.slice(index).startsWith(number.asStr))
          values.push(number.asInt);  
        })
      }
    }
    return values;
  }));

const sumValues = (values: number[][]) => values
  .map(x => {
    const first = x.at(0);
    const last = x.at(-1);
    if (!first || !last) throw Error();
    return Number.parseInt(`${first}${last}`);
  })
  .reduce((x,y) => x+y);