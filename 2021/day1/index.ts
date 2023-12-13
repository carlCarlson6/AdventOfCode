import { readFileSync } from 'fs';

const readInput = (): number[] => {
    const file = readFileSync('./dat1/input.txt', 'utf-8');
    const input = file.split('\n').map(inputString => Number(inputString));
    return input;
}

const calculateIncrements = (input: number[]): number => {
    let accumulated = 0;
    for (let i = 0; i < input.length; i++) {
        if(i === 0) {
            continue;
        }
        if (input[i] <= input[i-1]) {
            continue;
        }
    
        accumulated += 1;
    }
    return accumulated
}

const calculateMeasurements = (input: number[]): number[] => {
    const measurements = [];

    for (let i = 0; i < input.length; i++) {
        const measurement1 = input[i];
        const measurement2 = i+1 >= input.length ? 0 : input[i+1];
        const measurement3 = i+2 >= input.length ? 0 : input[i+2];

        const totalMeasurement = measurement1+measurement2+measurement3;
        measurements.push(totalMeasurement);
    }

    return measurements;
}

const increments = calculateIncrements(readInput());
console.log(increments);

const measurementsIncrements = calculateIncrements(calculateMeasurements(readInput()));
console.log(measurementsIncrements);