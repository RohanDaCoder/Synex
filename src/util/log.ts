import chalk from "chalk";

const log = (
  prefix: string,
  message: string,
  color: (text: string) => string,
) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(
    `${color(`[${prefix}]`)} ${chalk.gray(`[${timestamp}]`)} ${message}`,
  );
};
export default log;
