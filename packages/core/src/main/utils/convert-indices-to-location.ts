import { Location } from '../../shared';

const convertIndexToLocation = (
  source: string,
  position: number,
): [number, number] => {
  const lines = source.substr(0, position).split('\n');
  const ancestorLines = lines.slice(0, lines.length - 1);

  const line = lines.length;
  const column = position - ancestorLines.join('\n').length;

  return [line, column];
};

export const convertIndicesToLocation = (
  source: string,
  startIndex: number,
  endIndex: number,
): Location => {
  const startsAt = convertIndexToLocation(source, startIndex);
  const endsAt = convertIndexToLocation(source, endIndex);

  return {
    startLine: startsAt[0],
    startColumn: startsAt[1],
    endLine: endsAt[0],
    endColumn: endsAt[1],
  };
};
