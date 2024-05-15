import { Box, IconButton, TextField } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useCallback, useEffect, useState } from "react";
import { navigationButton, navigationContainer } from "./styles";

interface GameExaminerProps {
	game: number[][];
	onNavigate: (board: number[]) => void;
}

export default function GameExaminer({ game, onNavigate }: GameExaminerProps) {
	const [move, setMove] = useState(game.length - 1);

	const navigate = useCallback(
		(navigationDestination: number) => {
			if (navigationDestination < 0) return 0;
			if (navigationDestination >= game.length) return game.length - 1;
			if (!navigationDestination && navigationDestination !== 0) return move;
			return navigationDestination;
		},
		[game.length, move],
	);

	useEffect(() => {
		setMove(game.length - 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game]);

	useEffect(() => {
		onNavigate(game[move]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [move]);

	return (
		<Box sx={navigationContainer}>
			<IconButton
				sx={navigationButton}
				onClick={() => setMove(navigate(move - 100))}
			>
				<NavigateBeforeIcon />
				<NavigateBeforeIcon />
				<NavigateBeforeIcon />
			</IconButton>
			<IconButton
				sx={navigationButton}
				onClick={() => setMove(navigate(move - 10))}
			>
				<NavigateBeforeIcon />
				<NavigateBeforeIcon />
			</IconButton>
			<IconButton
				sx={navigationButton}
				onClick={() => setMove(navigate(move - 1))}
			>
				<NavigateBeforeIcon />
			</IconButton>
			<TextField
				type="number"
				value={String(move)}
				onChange={(event) => setMove(navigate(Number(event.target.value)))}
			/>
			<IconButton
				sx={navigationButton}
				onClick={() => setMove(navigate(move + 1))}
			>
				<NavigateNextIcon />
			</IconButton>
			<IconButton
				sx={navigationButton}
				onClick={() => setMove(navigate(move + 10))}
			>
				<NavigateNextIcon />
				<NavigateNextIcon />
			</IconButton>
			<IconButton
				sx={navigationButton}
				onClick={() => setMove(navigate(move + 100))}
			>
				<NavigateNextIcon />
				<NavigateNextIcon />
				<NavigateNextIcon />
			</IconButton>
		</Box>
	);
}
