export function findCornerWithLargestTile(board: number[]) {
	switch (Math.max(...board)) {
		case board[0]:
			return 0;
		case board[3]:
			return 3;
		case board[12]:
			return 12;
		case board[15]:
			return 15;
		default:
			return NaN;
	}
}
