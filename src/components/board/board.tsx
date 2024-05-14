import { Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { sample } from "lodash-es";
import {
	generateNewValue,
	getDirection,
	makeStartingBoard,
	move,
} from "./utils";
import Tile from "../tile";
import { boardStyles } from "./styles";
import { test } from "./testUtils";
import { findMoveDirections, getEmptyTiles } from "../../utils";
import { Direction } from "../../types/board";

interface BoardProps {
	board?: number[];
	makeMove?: [Direction];
	onMove?: (board: number[], move: Direction) => void;
	staticBoard?: boolean;
}

export default function Board({
	board,
	makeMove,
	onMove,
	staticBoard,
}: BoardProps): JSX.Element {
	const [boardValues, setBoardValues] = useState(makeStartingBoard());

	const moveLogic = useCallback(
		(direction: Direction) => {
			if (findMoveDirections(boardValues).includes(direction) && !staticBoard) {
				const movedBoard = move(boardValues, direction);
				const newTilePlacement = sample(getEmptyTiles(movedBoard))!;
				movedBoard[newTilePlacement] = generateNewValue();
				onMove?.(movedBoard, direction);
				setBoardValues(movedBoard);
			}
		},
		[boardValues, onMove, staticBoard],
	);

	const handleMove = useCallback(
		(event: KeyboardEvent) => {
			const direction = getDirection(event);
			if (direction !== null) {
				moveLogic(direction);
			}
		},
		[moveLogic],
	);

	useEffect(() => {
		test();
	}, []);

	useEffect(() => {
		if (board) {
			setBoardValues(board);
		}
	}, [board]);

	useEffect(() => {
		if (makeMove) {
			moveLogic(makeMove[0]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [makeMove]);

	useEffect(() => {
		window.addEventListener("keydown", handleMove);

		return () => window.removeEventListener("keydown", handleMove);
	}, [handleMove]);

	return (
		<Paper sx={boardStyles}>
			{boardValues.map((value) => (
				<Tile value={value ? 2 ** value : 0} />
			))}
		</Paper>
	);
}
