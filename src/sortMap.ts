import { DELIMITER } from './constants/strings';

export function sortMap(
  delimiter: string = DELIMITER,
): ((a: string, b: string) => number) | undefined {
  return (a, b) => {
    return (
      a.split(delimiter).length - b.split(delimiter).length ||
      a.localeCompare(b)
    );
  };
}
