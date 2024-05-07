import { chunk, forEach, partition } from "lodash-es";
import { Direction } from "./types/board";

export function mirrorBoard(board: number[]): number[] {
	const mirroredBoard: number[] = [];
	for (let i = 0; i < 4; i += 1) {
		mirroredBoard.push(board[i], board[i + 4], board[i + 8], board[i + 12]);
	}
	return mirroredBoard;
}

function move(rowOrColumn: number[]): number[] {
	// eslint-disable-next-line no-param-reassign
	rowOrColumn = partition(rowOrColumn, (tile) => tile).flat();
	for (let i = 0; i < 3 && rowOrColumn[i] !== 0; i += 1) {
		if (rowOrColumn[i] === rowOrColumn[i + 1]) {
			// eslint-disable-next-line no-param-reassign
			rowOrColumn[i] += 1;
			rowOrColumn.splice(i + 1, 1);
			rowOrColumn.push(0);
		}
	}
	return rowOrColumn;
}

export function moveLeft(initialBoard: number[]): number[] {
	const movedBoard = chunk(initialBoard, 4).map((row) => {
		return move(row);
	});
	return movedBoard.flat();
}

export function moveRight(initialBoard: number[]): number[] {
	const movedBoard = chunk(initialBoard, 4).map((row) => {
		row.reverse();
		return move(row).reverse();
	});
	return movedBoard.flat();
}

export function moveUp(initialBoard: number[]): number[] {
	return mirrorBoard(moveLeft(mirrorBoard(initialBoard)));
}

export function moveDown(initialBoard: number[]): number[] {
	return mirrorBoard(moveRight(mirrorBoard(initialBoard)));
}

export function getEmptyTiles(board: number[]) {
	const emptyTiles: number[] = [];

	forEach(board, (tile, index) => {
		!tile && emptyTiles.push(index);
	});

	return emptyTiles;
}

export function getNumberTiles(board: number[]) {
	const numberTiles: number[] = [];

	forEach(board, (tile, index) => tile && numberTiles.push(index));

	return numberTiles;
}

export function findMoveDirections(board: number[]) {
	const numberTiles = getNumberTiles(board);
	const moveDirections: Record<Direction, boolean> = {
		[Direction.Right]: false,
		[Direction.Left]: false,
		[Direction.Up]: false,
		[Direction.Down]: false,
	};

	forEach(numberTiles, (tileIndex) => {
		const tileValue = board[tileIndex];

		if (
			!moveDirections[Direction.Right] &&
			(tileIndex + 1) % 4 &&
			(tileValue === board[tileIndex + 1] || !board[tileIndex + 1])
		) {
			moveDirections[Direction.Right] = true;
		}

		if (
			!moveDirections[Direction.Left] &&
			tileIndex % 4 &&
			(tileValue === board[tileIndex - 1] || !board[tileIndex - 1])
		) {
			moveDirections[Direction.Left] = true;
		}

		if (
			!moveDirections[Direction.Up] &&
			tileIndex - 4 >= 0 &&
			(tileValue === board[tileIndex - 4] || !board[tileIndex - 4])
		) {
			moveDirections[Direction.Up] = true;
		}

		if (
			!moveDirections[Direction.Down] &&
			tileIndex + 4 < 16 &&
			(tileValue === board[tileIndex + 4] || !board[tileIndex + 4])
		) {
			moveDirections[Direction.Down] = true;
		}

		return !(
			moveDirections[Direction.Right] &&
			moveDirections[Direction.Left] &&
			moveDirections[Direction.Up] &&
			moveDirections[Direction.Down]
		);
	});

	const directions: Direction[] = [];

	moveDirections[Direction.Right] && directions.push(Direction.Right);
	moveDirections[Direction.Left] && directions.push(Direction.Left);
	moveDirections[Direction.Up] && directions.push(Direction.Up);
	moveDirections[Direction.Down] && directions.push(Direction.Down);

	return directions;
}
