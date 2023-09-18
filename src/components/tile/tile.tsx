import { Paper } from "@mui/material";
import { numberStyle } from "./utils";

interface TileProps {
	value: number;
}

export default function Tile({ value }: TileProps): JSX.Element {
	return (
		<Paper sx={numberStyle(value)} variant="tile">
			{value || null}
		</Paper>
	);
}
