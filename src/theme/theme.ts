import { createTheme } from "@mui/material";

const theme = createTheme({
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
	},
});

export default theme;
