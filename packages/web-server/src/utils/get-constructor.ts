// eslint-disable-next-line
export const getConstructor = <T extends Record<string, any>>(obj: T) =>
  Object.getPrototypeOf(obj).constructor;
