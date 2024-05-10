import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { round, sample } from "lodash-es";
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
	const [startTime, setStartTime] = useState(0);
	const [moveCount, setMoveCount] = useState(0);
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
		if (Math.max(...boardValues) >= 11)
			localStorage.setItem("latestBoard", JSON.stringify(boardValues));
	}, [boardValues]);

	useEffect(() => {
		if (autoplay && findMoveDirections(boardValues).length) {
			let depth = 3;
			if (Math.max(...boardValues) > 10) {
				depth = 4;
			}
			if (
				Math.max(...boardValues) > 11 &&
				boardValues.some(
					(tile) => tile < Math.max(...boardValues) && tile >= 11,
				)
			) {
				depth = 5;
			}
			const direction = expectimax(
				boardValues,
				getEmptyTiles(boardValues).length <= 3 ? depth + 1 : depth,
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
				setMoveCount(moveCount + 1);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoplay, boardValues]);

	return (
		<Box>
			<Paper sx={board}>
				{boardValues.map((value) => (
					<Tile value={value ? 2 ** value : 0} />
				))}
			</Paper>
			{findMoveDirections(boardValues).length === 0 && (
				<Typography color="black">You Lost!</Typography>
			)}
			<Button
				onClick={() => {
					setAutoplay(!autoplay);
					setStartTime(Date.now());
					setMoveCount(0);
				}}
			>
				toggle autoplay
			</Button>
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
			<Button
				onClick={() =>
					setBoardValues(JSON.parse(localStorage.getItem("latestBoard")!))
				}
			>
				load latest board
			</Button>
			<Typography color="black">
				{Math.floor((Date.now() - startTime) / 60000)}:
				{Math.floor(((Date.now() - startTime) % 60000) / 1000)}
			</Typography>
			<Typography color="black">
				{"avrage move duration: "}
				{round(Math.floor((Date.now() - startTime) / 1000) / moveCount, 2)}
			</Typography>
			<Typography color="black">moves: {moveCount}</Typography>
		</Box>
	);
}
