export const id = <T>(x: T): T => x;

export const panic = (error: unknown): never => {
  throw error;
};

export const not = <T extends unknown[]>(fn: (...args: T) => boolean) => (
  ...args: T
): boolean => !fn(...args);
