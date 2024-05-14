import { Button, Paper, TextField, Typography } from "@mui/material";
import { round } from "lodash-es";
import { useState } from "react";
import { calcBoardSmoothnes } from "../board/utils";
import { findCornerWithLargestTile } from "./utils";
import { statContainer } from "./styles";

interface StatBoardProps {
	board: number[];
	moveCount: number;
	gameDuration: number;
}

export default function StatBoard({
	board,
	moveCount,
	gameDuration,
}: StatBoardProps) {
	const [saveName, setSaveName] = useState("");

	return (
		<Paper sx={statContainer}>
			<Typography color="black">move count: {moveCount}</Typography>
			<Typography color="black">
				monotenacity score:{" "}
				{round(
					calcBoardSmoothnes(board, findCornerWithLargestTile(board)) + 1,
					2,
				)}
			</Typography>
			<Typography color="black">
				{Math.floor(gameDuration / 60000)}:
				{Math.floor((gameDuration % 60000) / 1000)}
			</Typography>
			<Typography color="black">
				{"avrage move duration: "}
				{round(Math.floor(gameDuration / 1000) / moveCount, 2)}
			</Typography>
			<Button
				onClick={() => localStorage.setItem(saveName, JSON.stringify(board))}
			>
				save board
			</Button>
			<TextField onChange={(event) => setSaveName(event.target.value)} />
		</Paper>
	);
}
