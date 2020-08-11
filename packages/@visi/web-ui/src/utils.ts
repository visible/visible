// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pluck = <T extends Record<string, any>>(key: keyof T) => (object: T) =>
  object[key];

const createPluck = <T extends string>(props: T[]) => {
  return props.reduce((plucks, prop) => {
    plucks[prop] = pluck(prop);
    return plucks;
  }, {} as { [key in T]: ReturnType<typeof pluck> });
};

const createShouldForwardProp = (props: unknown[]) => (prop: unknown) =>
  !props.includes(prop);

export interface Hints<T extends string> {
  readonly select: { [key in T]: ReturnType<typeof pluck> };
  shouldForwardProp(prop: unknown): boolean;
}

export const createHelpers = <T extends string>(props: T[]): Hints<T> => ({
  shouldForwardProp: createShouldForwardProp(props),
  select: createPluck(props),
});
