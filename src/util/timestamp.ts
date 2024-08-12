export default (
  timestamp: number,
  type: "t" | "T" | "d" | "D" | "f" | "F" | "R"
) => {
  return `<t:${Math.floor(timestamp / 1000)}${type ? `:${type}` : ""}>`;
};
