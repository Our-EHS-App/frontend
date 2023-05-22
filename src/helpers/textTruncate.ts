interface truncateArg {
  text: string;
  length: number;
  maxLengthAllowed?: number;
}

/**
 * It takes a string and returns a truncated version of it
 * @param {truncateArg}  - truncateArg
 */
export const truncate = ({
  text,
  maxLengthAllowed = 300,
  length = 200,
}: truncateArg) =>
  text?.length > maxLengthAllowed ? `${text.substring(0, length)}...` : text;
