interface Constructor<T, U> {
  new (params: U): T;
}

export const constructIfNewable = <T extends unknown, U>(
  constructorLike: Constructor<T, U> | T,
  params?: U,
): T => {
  if (typeof constructorLike === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new (constructorLike as any)(params);
  }

  return constructorLike;
};
