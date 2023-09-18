import { SystemStyleObject } from "@mui/system";
import { over2048, tileStyles } from "./styles";

export function numberStyle(value: number): SystemStyleObject {
	return value <= 2048 ? tileStyles[value] : over2048;
}
