import {
	forEach,
	max,
	maxBy,
	random,
	range,
	reduce,
	sampleSize,
	sum,
} from "lodash-es";
import { Direction } from "../../types/board";
import {
	findMoveDirections,
	getEmptyTiles,
	getNumberTiles,
	moveDown,
	moveLeft,
	moveRight,
	moveUp,
} from "../../utils";

export function generateNewValue(): 1 | 2 {
	return random(0, 9) ? 1 : 2;
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

function hashBoard(bourd: number[]) {
	return reduce(
		bourd,
		// eslint-disable-next-line no-bitwise
		(hash, tile) => (hash << BigInt(4)) + BigInt(tile),
		BigInt(0),
	)!;
}

function calcBoardSmoothness(board: number[]) {
	// let score1 = 0;
	// let score2 = 0;
	let score = 0;

	forEach(getNumberTiles(board), (tileIndex) => {
		if ((tileIndex + 1) % 4) {
			score += Math.abs(board[tileIndex] - board[tileIndex + 1]);
		}

		if (tileIndex % 4) {
			score += Math.abs(board[tileIndex] - board[tileIndex]);
		}

		if (tileIndex - 4 >= 0) {
			score += Math.abs(board[tileIndex] - board[tileIndex - 4]);
		}

		if (tileIndex + 4 < 16) {
			score += Math.abs(board[tileIndex] - board[tileIndex + 4]);
		}
	});

	return max(board)! / score + 1;

	// if (startingCorner === 0) {
	// 	const calcScore2Index = (index: number) =>
	// 		(index % 4) * 4 + Math.floor(index / 4);

	// 	for (let index = 0; index < 16; index += 1) {
	// 		score1 += Math.abs(board[index] - board[index + 1]);
	// 		score2 += Math.abs(
	// 			board[calcScore2Index(index)] - board[calcScore2Index(index + 1)],
	// 		);
	// 	}
	// }

	// if (startingCorner === 3) {
	// 	const calcScore1Index = (index: number) =>
	// 		Math.floor(index / 4) * 4 + 3 - (index % 4);
	// 	const calcScore2Index = (index: number) =>
	// 		(index % 4) * 4 + 3 - Math.floor(index / 4);

	// 	for (let index = 0; index < 16; index += 1) {
	// 		score1 += Math.abs(
	// 			board[calcScore1Index(index)] - board[calcScore1Index(index + 1)],
	// 		);
	// 		score2 += Math.abs(
	// 			board[calcScore2Index(index)] - board[calcScore2Index(index + 1)],
	// 		);
	// 	}
	// }

	// if (startingCorner === 12) {
	// 	const calcScore1Index = (index: number) =>
	// 		Math.floor(index / 4) * 4 + 3 - (index % 4);
	// 	const calcScore2Index = (index: number) =>
	// 		(index % 4) * 4 + 3 - Math.floor(index / 4);

	// 	for (let index = 15; index > 0; index -= 1) {
	// 		score1 += Math.abs(
	// 			board[calcScore1Index(index)] - board[calcScore1Index(index - 1)],
	// 		);
	// 		score2 += Math.abs(
	// 			board[calcScore2Index(index)] - board[calcScore2Index(index - 1)],
	// 		);
	// 	}
	// }

	// if (startingCorner === 15) {
	// 	const calcScore2Index = (index: number) =>
	// 		(index % 4) * 4 + Math.floor(index / 4);

	// 	for (let index = 15; index > 0; index -= 1) {
	// 		score1 += Math.abs(board[index] - board[index - 1]);
	// 		score2 += Math.abs(
	// 			board[calcScore2Index(index)] - board[calcScore2Index(index - 1)],
	// 		);
	// 	}
	// }

	// return (board[startingCorner] / Math.min(score1, score2) + 1) * 2;
}

function evalFunction(board: number[]) {
	if (!findMoveDirections(board).length) {
		return 0;
	}

	const largestTileValue = max(board)!;
	const bonus = -sum(board);

	if (
		largestTileValue === board[0] ||
		largestTileValue === board[3] ||
		largestTileValue === board[12] ||
		largestTileValue === board[15]
	) {
		return (
			2 ** largestTileValue * calcBoardSmoothness(board) + bonus
			// (getEmptyTiles(board).length / 16 + 1)
		);
	}

	return 2 ** largestTileValue + bonus;
}

export function expectimax(
	board: number[],
	depth = 3,
	scoreCache: Map<BigInt, [Direction, number]> = new Map(),
) {
	const possibleMoveDirections = findMoveDirections(board);

	if (!possibleMoveDirections.length) {
		return [undefined, 0] as const;
	}

	const moveScores = Object.fromEntries<number>(
		possibleMoveDirections.map((direction) => [direction, 0]),
	);

	forEach(possibleMoveDirections, (direction) => {
		const movedBoard = move(board, direction);
		const boardHash = hashBoard(movedBoard);
		if (scoreCache.has(boardHash)) {
			moveScores[direction] += scoreCache.get(boardHash)![1];
		} else {
			const emptyTiles = getEmptyTiles(movedBoard);
			forEach(emptyTiles, (tile) => {
				const movedBoardWith2 = [...movedBoard];
				movedBoardWith2[tile] = 1;
				const movedBoardWith2Score =
					depth <= 1
						? evalFunction(board)
						: expectimax(movedBoardWith2, depth - 1, scoreCache)[1];

				const movedBoardWith4 = [...movedBoard];
				movedBoardWith4[tile] = 2;
				const movedBoardWith4Score =
					depth <= 1
						? evalFunction(board)
						: expectimax(movedBoardWith4, depth - 1, scoreCache)[1];

				moveScores[direction] +=
					(movedBoardWith2Score * 0.9 + movedBoardWith4Score * 0.1) /
					emptyTiles.length;
			});
			// eslint-disable-next-line no-param-reassign
			scoreCache.set(boardHash, [direction, moveScores[direction]]);
		}
	});

	return (
		maxBy(Object.entries(moveScores), (entry) => entry[1]) ||
		([undefined, 0] as const)
	);
}
