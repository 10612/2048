import { chunk, partition } from "lodash-es";

function move(rowOrColumn: number[]): void {
	// eslint-disable-next-line no-param-reassign
	rowOrColumn = partition(rowOrColumn, (tile) => tile).flat();
	for (let i = 0; i < 3 && rowOrColumn[i] !== 0; i += 1) {
		if (rowOrColumn[i] === rowOrColumn[i + 1]) {
			// eslint-disable-next-line no-param-reassign
			rowOrColumn[i] *= 2;
			rowOrColumn.splice(i, 1);
			rowOrColumn.push(0);
		}
	}
}

export function moveLeft(initialBoard: number[]): number[] {
	const movedBoard = chunk(initialBoard, 4).map((row) => {
		move(row);
		return row;
	});
	return movedBoard.flat();
}

export function moveRight(initialBoard: number[]): number[] {
	const movedBoard = chunk(initialBoard, 4).map((row) => {
		row.reverse();
		move(row);
		return row.reverse();
	});
	return movedBoard.flat();
}

export function moveUp(initialBoard: number[]): number[] {
	const movedBoard = chunk(initialBoard, 4).map((column) => {
		move(column);
		return column;
	});
	return movedBoard.flat();
}
