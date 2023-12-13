import { isNumber, readDataLines, validateSample } from "../common";

type Engine = {
  value: number;
  coordinates: Coordinate[];
}

type Symbol = {
  value: string;
  coordinate: Coordinate;
}

type Coordinate = [number, number];

const calculateDistance = (a: Coordinate, b: Coordinate) => Math.floor(Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2)));

const isEnginePartNextToSymbol = (engineCoordinates: Coordinate[], symbolCoordinate: Coordinate) => engineCoordinates
  .map(engineCoordinate => calculateDistance(engineCoordinate, symbolCoordinate))
  .some(distance => distance === 1);

export const day3 = () => {
  console.log("DAY 3");
  console.log("------------------------");

  console.log("sample part 1");
  validateSample(solvePart1(readDataLines(3, 'sample1')), 4361);

  const solutionPart1 = solvePart1(readDataLines(3, 'full'));
  console.log("solution for part 1 is", solutionPart1, "is ok?", 535235 === solutionPart1);

  console.log("sample part 2");
  validateSample(solvePart2(readDataLines(3, 'sample1')), 467835);

  const solutionPart2 = solvePart2(readDataLines(3, 'full'));
  console.log("solution for part 2 is", solutionPart2, "is ok?", 79844424 === solutionPart2);
}

const solvePart1 = (data: string[]) => {
  const { engines, symbols } = parseData(data);
  return engines
    .filter(engine => symbols
      .some(symbol => isEnginePartNextToSymbol(engine.coordinates, symbol.coordinate)))
    .map(x => x.value)
    .reduce((a, b) => a+b);
}

const solvePart2 = (data: string[]) => {
  const { engines, symbols } = parseData(data);
  const gearCandidates = symbols.filter(symbol => symbol.value === "*");
  return gearCandidates
    .map(gear => ({
      ...gear,
      isGear: engines.filter(engine => isEnginePartNextToSymbol(engine.coordinates, gear.coordinate)).length === 2,
      ratio: engines.filter(engine => isEnginePartNextToSymbol(engine.coordinates, gear.coordinate)).map(x => x.value).reduce((a,b) => a*b)
    }))  
    .filter(gear => gear.isGear)
    .map(gear => gear.ratio)
    .reduce((a,b) => a+b);
}

const parseData = (lines: string[]): { engines: Engine[], symbols: Symbol[] } => {
  const engines: Engine[] = [];
  const symbols: Symbol[] = [];

  for (let x = 0; x < lines.length; x++) {
    const line = lines[x].split('');
    let numberDigits = "";
    let numberCoordinates: Coordinate[] = [];

    for (let y = 0; y < line.length; y++) {
      const character = line[y];
      
      if (isNumber(character)) {
        numberDigits = `${numberDigits}${character}`;
        numberCoordinates.push([x,y]);
        continue;
      }

      if (character === '.') {
        if (numberDigits !== "" || numberCoordinates.length !== 0){
          engines.push({ value: Number.parseInt(numberDigits), coordinates: [...numberCoordinates] });
        }
        numberDigits = "";
        numberCoordinates = [];
        continue;
      }

      if (!isNumber(character)) {
        if (numberDigits !== "" || numberCoordinates.length !== 0){
          engines.push({ value: Number.parseInt(numberDigits), coordinates: [...numberCoordinates] });
        }

        numberDigits = "";
        numberCoordinates = [];
        symbols.push({ coordinate: [x,y], value: character });
        continue;
      }
    }

    if (numberDigits === "" || numberCoordinates.length === 0) continue;

    engines.push({ value: Number.parseInt(numberDigits), coordinates: [...numberCoordinates] });
    numberDigits = "";
    numberCoordinates = [];
  }

  return { engines, symbols, };
}

