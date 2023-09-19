import { Paper } from "@mui/material";
import { useState } from "react";
import { makeStartingBoard } from "./utils";
import Tile from "../tile";
import { board } from "./styles";

export default function Board(): JSX.Element {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [boardValues, setBoardValues] = useState(makeStartingBoard());
	console.log(boardValues);

	return (
		<Paper sx={board}>
			{boardValues.map((value) => (
				<Tile value={value} />
			))}
		</Paper>
	);
}
