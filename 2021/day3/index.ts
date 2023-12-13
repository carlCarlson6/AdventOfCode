import { readFileSync } from "fs";
import { DiagnosticMarchine } from "./diagnostic-machine";

const readInput = (): string[] => readFileSync('./day3/input.txt', 'utf-8').split('\n');
const rawData = readInput();

const diagnostic = new DiagnosticMarchine();

diagnostic.processGammaEpsilonRates(rawData);
const powerConsumption = diagnostic.calculatePowerConsumption();
console.log('powerConsumption', powerConsumption);

diagnostic.processOxygenCO2Rates(rawData);
const ligeSupportRating = diagnostic.calculateLifeSupportRating()
console.log('ligeSupportRating', ligeSupportRating);