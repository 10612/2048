import { createTheme } from "@mui/material";
import { initialShadows } from "./shadows/shadows";

const theme = createTheme({
	typography: {
		fontFamily: "Clear Sans",
	},
	shadows: initialShadows(),
	components: {
		MuiPaper: {
			variants: [
				{
					props: { variant: "tile" },
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "3px",
						fontWeight: "bold",
						fontSize: "55px",
						color: "#f9f6f2",
					},
				},
			],
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: "18px",
					height: "40px",
					padding: "0px 20px",
					color: "#f9f6f2",
					backgroundColor: "#8f7a66",
					textTransform: "capitalize",
					"&:hover": {
						backgroundColor: "#a5896f",
					},
				},
			},
		},
	},
});

export default theme;
