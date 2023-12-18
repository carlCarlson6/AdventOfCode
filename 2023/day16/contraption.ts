import {ContraptionMap, ContraptionTileSymbol, EnergizedTiles} from "./types";

export const runContraption = (
	map: ContraptionMap,
	{position: initialPosition, direction: initialDirection}: {position: {x: number, y: number}, direction: {x: number, y: number}}
	): {
	tiles: EnergizedTiles,
	newBeams: {position: {x: number, y: number}, direction: {x: number, y: number}}[]
} => {
	let currentPosition = initialPosition;
	let currentDirection = initialDirection;
	const visitedTiles: EnergizedTiles = [];
	const newBeams:  {
		position: {x: number, y: number},
		direction: {x: number, y: number},
	}[] = []; 

	do {
		const currentPositionSymbol = map[currentDirection.y][currentDirection.x];
		const {beams} = move(currentPosition, currentDirection, currentPositionSymbol);
		const [currentBeam, ...otherBeams] = beams;
		visitedTiles.push(currentPosition);
		newBeams.push(...otherBeams);
		currentPosition = currentBeam.position;
		currentDirection = currentBeam.direction;
	} while (isOut(currentPosition.x, currentPosition.y, map));

	return {
		tiles: visitedTiles,
		newBeams,
	}
}

const move = (
	position: {x: number, y: number},
	direction: {x: number, y: number},
	symbol: ContraptionTileSymbol,
	): {
	beams: {
		position: {x: number, y: number},
		direction: {x: number, y: number},
	}[]
} => {
	switch (symbol) {
		case ".": 	return applyDotSymbol(position, direction);
		case "/": 	return applyMirrorDownUp(position, direction);
		case "\\": 	return applyMirrorUpDown(position, direction);
		case "-": 	return applyHorizontalSplit(position, direction);
		case "|": 	return applyVerticalSplit(position, direction);
		default: 		throw new Error("invalid movement case")
	}
}

const applyDotSymbol = (
	position: {x: number, y: number},
	direction: {x: number, y: number},
	): {
	beams: {
		position: {x: number, y: number},
		direction: {x: number, y: number},
	}[]
} => ({
	beams: [{
		direction,
		position: {
			x: position.x+direction.x,
			y: position.y+direction.y
		}
	}]
})

// this is the / mirror
const applyMirrorDownUp = (
	position: {x: number, y: number},
	direction: {x: number, y: number},
	): {
	beams: {
		position: {x: number, y: number},
		direction: {x: number, y: number},
	}[]
} => {
	throw new Error("invalid movement case")
}

// this is the \ mirror
const applyMirrorUpDown = (
	position: {x: number, y: number},
	direction: {x: number, y: number},
	): {
	beams: {
		position: {x: number, y: number},
		direction: {x: number, y: number},
	}[]
} => {
	throw new Error("invalid movement case")
}

const applyVerticalSplit = (
	position: {x: number, y: number},
	direction: {x: number, y: number},
	): {
	beams: {
		position: {x: number, y: number},
		direction: {x: number, y: number},
	}[]
} => {
	if ((direction.x === 1 && direction.y === 0) || (direction.x === -1 && direction.y === 0)) {
		return {
			beams: [
				{
					direction: {
						x: 0,
						y: 1,
					},
					position: {
						x: position.x,
						y: position.y - 1
					}
				},
				{
					direction: {
						x: 0,
						y: -1,
					},
					position: {
						x: position.x,
						y: position.y + 1
					}
				}
			]
		}
	}
	return {
		beams: [{
			direction,
			position: {
				x: position.x + direction.x,
				y: position.y + direction.y
			}
		}]
	}
}

const applyHorizontalSplit = (
	position: {x: number, y: number},
	direction: {x: number, y: number},
	): {
	beams: {
		position: {x: number, y: number},
		direction: {x: number, y: number},
	}[]
} => {
	throw new Error("invalid movement case")
}

const isOut = (x: number, y: number, map: ContraptionMap) => {
	try {
		const _ = map[y][x];
		return false;
	} catch {
		return true;
	}
}