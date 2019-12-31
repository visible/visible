// https://stackoverflow.com/questions/48281130/why-cant-i-access-window-in-an-exposefunction-function-with-puppeteer
export const runnable = <T, U>(fn: (a: T) => U): ((a: T) => U) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return new Function('arguments', `return ${fn.toString()}(arguments)`);
};
