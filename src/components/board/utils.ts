import { random, range, sampleSize } from "lodash-es";
import { Direction } from "../../types/board";
import { moveDown, moveLeft, moveRight, moveUp } from "../../utils";

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

export function getDirection(
	event: React.KeyboardEvent<HTMLDivElement>,
): Direction | null {
	const { key } = event;
	console.log(event.key);
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
