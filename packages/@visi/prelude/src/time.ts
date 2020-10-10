export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms);
  });
};

export const timeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Evaluation timed out')), ms),
    ),
  ]);
