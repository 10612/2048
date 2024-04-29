import { useCallback, useEffect, useState } from "react";
import Tile from "../tile";
import { board } from "./styles";

export default function Board(): JSX.Element {
	const [boardValues, setBoardValues] = useState(makeStartingBoard());

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
		</Box>
	);
}
