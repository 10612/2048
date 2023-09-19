import { random, range, sampleSize } from "lodash-es";
import { Direction } from "../../types/board";
import { moveLeft, moveRight } from "../../utils";

export function generateNewValue(): 2 | 4 {
	return random(0, 9) ? 2 : 4;
}

export function makeStartingBoard(): number[] {
	const board = new Array(16).fill(0);

	const openSlots = range(0, 16);

	const [firstIndex, secondIndex] = sampleSize(openSlots, 2);

	board[firstIndex] = generateNewValue();
	board[secondIndex] = generateNewValue();

	return board;
}

export function move(initialBoard: number[], direction: Direction): number[] {
	switch (direction) {
		case Direction.Left:
			return moveLeft(initialBoard);
		case Direction.Right:
			return moveRight(initialBoard);
		case Direction.Up:
			return initialBoard;
			break;
		case Direction.Down:
			return initialBoard;
			break;
		default:
			throw Error(`${direction} is not a direction`);
			break;
	}
}
