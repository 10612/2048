import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Board, { makeStartingBoard } from "../components/board";
import GameExaminer from "../components/gameExaminer";
import { findMoveDirections, getEmptyTiles } from "../utils";
import { appContainer } from "./styles";
import "./App.css";
import StatBoard from "../components/statBoard";
import { expectimax } from "../components/board/utils";
import { Direction } from "../types/board";

function App(): JSX.Element {
	const [isGameOngoing, setIsGameOngoing] = useState(true);
	const [gameSave, setGameSave] = useState<number[][]>([]);
	const [board, setBoard] = useState<number[]>(makeStartingBoard());
	const [move, setMove] = useState<[Direction]>();
	const [startTime, setStartTime] = useState(Date.now());
	const [autoplay, setAutoplay] = useState(false);

	const handleMove = useCallback(
		(newBoard: number[]) => {
			setBoard(newBoard);
			setGameSave([...gameSave, newBoard]);
			if (!findMoveDirections(newBoard).length) {
				setIsGameOngoing(false);
			}
			if (Math.max(...newBoard) >= 11)
				localStorage.setItem("latestBoard", JSON.stringify(newBoard));
		},
		[gameSave],
	);

	useEffect(() => {
		if (autoplay && findMoveDirections(board).length) {
			let depth = 2;
			if (Math.max(...board) > 11) {
				depth = 3;
			}
			if (
				Math.max(...board) > 10 &&
				board.some((tile) => tile < Math.max(...board) && tile >= 10)
			) {
				depth = 4;
			}

			if (
				Math.max(...board) > 11 &&
				board.some((tile) => tile < Math.max(...board) && tile >= 11)
			) {
				depth = 5;
			}
			const direction = expectimax(
				board,
				getEmptyTiles(board).length <= 3 ? depth + 1 : depth,
			)[0] as Direction;
			if (direction !== null && findMoveDirections(board).includes(direction)) {
				setMove([direction]);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoplay, board]);

	return (
		<Box sx={appContainer}>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					justifyItems: "center",
					width: "100%",
				}}
			>
				<Box />
				<Board
					board={board}
					makeMove={move}
					onMove={handleMove}
					staticBoard={!isGameOngoing}
				/>
				<StatBoard
					board={board}
					moveCount={gameSave.length}
					gameDuration={Date.now() - startTime}
				/>
			</Box>
			<Box sx={{ display: "flex", gap: "12px" }}>
				<Button
					onClick={() => {
						setAutoplay(!autoplay);
					}}
				>
					toggle autoplay
				</Button>
				<Button
					onClick={() => {
						setBoard(makeStartingBoard());
						setGameSave([]);
						setIsGameOngoing(true);
						setStartTime(Date.now());
					}}
				>
					restart
				</Button>
				<Button
					onClick={() =>
						setBoard(JSON.parse(localStorage.getItem("latestBoard")!))
					}
				>
					load latest board
				</Button>
			</Box>
			{!isGameOngoing && (
				<GameExaminer
					game={gameSave}
					onNavigate={(currentBoard) => setBoard(currentBoard)}
				/>
			)}
		</Box>
	);
}

export default App;
