import { Shadows } from "@mui/material";

export const initialShadows = (): Shadows => {
	const shadows = Array(25).fill("none") as Shadows;
	shadows[1] =
		"0 0 30px 10px rgba(243, 215, 116, 0.238095), inset 0 0 0 1px rgba(255, 255, 255, 0.142857)";
	shadows[2] =
		"0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.190476)";
	shadows[3] =
		"0 0 30px 10px rgba(243, 215, 116, 0.396825), inset 0 0 0 1px rgba(255, 255, 255, 0.238095)";
	shadows[4] =
		"0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.285714)";
	shadows[5] =
		"0 0 30px 10px rgba(243, 215, 116, 0.555556), inset 0 0 0 1px rgba(255, 255, 255, 0.333333)";
	return shadows;
};
