import colors from "colors";
import { LogProps } from "../types";
function log({ prefix, message, color }: LogProps) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(
    `${colors[color](`[${prefix}]`)} ${colors.gray(
      `[${timestamp}]`,
    )} ${message}`,
  );
}
export default log;
