import { forEach, max, maxBy, random, range, sampleSize, sum } from "lodash-es";
import { Direction } from "../../types/board";
import {
	findMoveDirections,
	getEmptyTiles,
	moveDown,
	moveLeft,
	moveRight,
	moveUp,
} from "../../utils";

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

export function getDirection(event: KeyboardEvent): Direction | null {
	const { key } = event;
	if (key === "a" || key === "A" || key === "ArrowLeft") {
		return Direction.Left;
	}
	if (key === "d" || key === "D" || key === "ArrowRight") {
		return Direction.Right;
	}
	if (key === "w" || key === "W" || key === "ArrowUp") {
		return Direction.Up;
	}
	if (key === "s" || key === "S" || key === "ArrowDown") {
		return Direction.Down;
	}
	return null;
}

export function move(initialBoard: number[], direction: Direction): number[] {
	switch (direction) {
		case Direction.Left:
			return moveLeft(initialBoard);
		case Direction.Right:
			return moveRight(initialBoard);
		case Direction.Up:
			return moveUp(initialBoard);
		case Direction.Down:
			return moveDown(initialBoard);
		default:
			throw Error(`${direction} is not a direction`);
	}
}

function evalFunction(board: number[]) {
	return findMoveDirections(board).length
		? sum(board) * Math.log2(max(board) || 1)
		: 0;
}

export function expectimax(board: number[], depth = 3) {
	const possibleMoveDirections = findMoveDirections(board);

	if (!possibleMoveDirections.length) {
		return [undefined, 0] as const;
	}

	const moveScores = Object.fromEntries<number>(
		possibleMoveDirections.map((direction) => [direction, 0]),
	);

	forEach(possibleMoveDirections, (direction) => {
		const movedBoard = move(board, direction);
		forEach(getEmptyTiles(movedBoard), (tile) => {
			const movedBoardWith2 = [...movedBoard];
			movedBoardWith2[tile] = 2;
			const movedBoardWith2Score =
				depth <= 1
					? evalFunction(board)
					: expectimax(movedBoardWith2, depth - 1)[1];

			const movedBoardWith4 = [...movedBoard];
			movedBoardWith4[tile] = 4;
			const movedBoardWith4Score =
				depth <= 1
					? evalFunction(board)
					: expectimax(movedBoardWith4, depth - 1)[1];

			moveScores[direction] +=
				movedBoardWith2Score * 0.9 + movedBoardWith4Score * 0.1;
		});
	});

	return maxBy(Object.entries(moveScores), (entry) => entry[1])!;
}
