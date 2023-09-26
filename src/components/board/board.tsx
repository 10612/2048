import { Box, Paper } from "@mui/material";
import { useCallback, useState } from "react";
import { getDirection, makeStartingBoard, move } from "./utils";
import Tile from "../tile";
import { board } from "./styles";

export default function Board(): JSX.Element {
	const [boardValues, setBoardValues] = useState(makeStartingBoard());

	const handleMove = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const direction = getDirection(event);
			if (direction !== null) {
				setBoardValues((currentBoardValues) => {
					const nb = move(currentBoardValues, direction);
					console.log(nb);
					return nb;
				});
			}
		},
		[],
	);

	return (
		<>
			<Box component="input" onKeyDown={handleMove} />
			<Paper sx={board}>
				{boardValues.map((value) => (
					<Tile value={value} />
				))}
			</Paper>
		</>
	);
}
