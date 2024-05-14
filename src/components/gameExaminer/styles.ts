import { SystemStyleObject } from "@mui/system";

export const navigationContainer: SystemStyleObject = {
	display: "flex",
};

export const navigationButton: SystemStyleObject = {
	height: "40px",
	width: "40px",
	"& > *": {
		margin: "0px -8px",
	},
};
