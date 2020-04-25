import { Location } from '../location';

describe('CSSPointer', () => {
  it('accepts valid entity', () => {
    expect(() => {
      new Location({
        startLine: 1,
        startColumn: 1,
        endLine: 1,
        endColumn: 1,
      });
    }).not.toThrow();
  });

  it('rejects negative or floating points', () => {
    expect(() => {
      new Location({
        startLine: -1,
        startColumn: -1,
        endLine: 0.5,
        endColumn: 1.5,
      });
    }).toThrow();
  });
});
