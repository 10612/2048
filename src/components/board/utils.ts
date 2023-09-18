import { random, range, sampleSize } from "lodash-es";
import { Board, Direction } from "../../types/board";

export function generateNewValue(): 2 | 4 {
	return random(0, 9) ? 2 : 4;
}

export function makeStartingBoard(): Board {
	const board = new Array(16).fill(0) as Board;

	const openSlots = range(0, 16);

	const [firstIndex, secondIndex] = sampleSize(openSlots, 2);

	board[firstIndex] = generateNewValue();
	board[secondIndex] = generateNewValue();

	return board;
}

export function move(initialBoard, direction: Direction): void {}
