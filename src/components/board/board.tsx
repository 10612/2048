import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { sample } from "lodash-es";
import {
	expectimax,
	generateNewValue,
	getDirection,
	makeStartingBoard,
	move,
} from "./utils";
import Tile from "../tile";
import { board } from "./styles";
import { test } from "./testUtils";
import { findMoveDirections, getEmptyTiles } from "../../utils";
import { Direction } from "../../types/board";

export default function Board(): JSX.Element {
	const [boardValues, setBoardValues] = useState(makeStartingBoard());
	const [autoplay, setAutoplay] = useState(false);
	const [saveName, setSaveName] = useState("");

	const handleMove = useCallback(
		(event: KeyboardEvent) => {
			const direction = getDirection(event);
			if (
				direction !== null &&
				findMoveDirections(boardValues).includes(direction)
			) {
				setBoardValues((currentBoardValues) => {
					const movedBoard = move(currentBoardValues, direction);
					const newTilePlacement = sample(getEmptyTiles(movedBoard))!;
					movedBoard[newTilePlacement] = generateNewValue();
					return movedBoard;
				});
			}
		},
		[boardValues],
	);

	useEffect(() => {
		test();
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", handleMove);

		return () => window.removeEventListener("keydown", handleMove);
	}, [handleMove]);

	useEffect(() => {
		if (autoplay && findMoveDirections(boardValues).length) {
			const direction = expectimax(
				boardValues,
				getEmptyTiles(boardValues).length <= 3 ? 4 : 3,
			)[0] as Direction;
			if (
				direction !== null &&
				findMoveDirections(boardValues).includes(direction)
			) {
				setBoardValues((currentBoardValues) => {
					const movedBoard = move(currentBoardValues, direction);
					const newTilePlacement = sample(getEmptyTiles(movedBoard))!;
					movedBoard[newTilePlacement] = generateNewValue();
					return movedBoard;
				});
			}
		}
	}, [autoplay, boardValues]);

	return (
		<Box>
			<Paper sx={board}>
				{boardValues.map((value) => (
					<Tile value={value} />
				))}
			</Paper>
			{findMoveDirections(boardValues).length === 0 && (
				<Typography color="black">You Lost!</Typography>
			)}
			<Button onClick={() => setAutoplay(!autoplay)}>toggle autoplay</Button>
			<Button onClick={() => setBoardValues(makeStartingBoard())}>
				restart
			</Button>
			<Button
				onClick={() =>
					localStorage.setItem(saveName, JSON.stringify(boardValues))
				}
			>
				save board
			</Button>
			<TextField onChange={(event) => setSaveName(event.target.value)} />
		</Box>
	);
}
