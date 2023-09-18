import { SystemStyleObject } from "@mui/system";

export const board: SystemStyleObject = {
	display: "grid",
	height: "470px",
	width: "470px",
	padding: "15px",
	borderRadius: "6px",
	backgroundColor: "#bbada0",
	gridTemplateColumns: "repeat(4, 1fr)",
	gridAutoRows: "1fr",
	gap: "15px",
};
