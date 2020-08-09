import { Driver } from './driver';

export const launch = jest.fn();
export const quit = jest.fn();
export const open = jest.fn();
export const close = jest.fn();
export const addScript = jest.fn();
export const runScript = jest.fn();
export const waitFor = jest.fn();
export const waitForFunction = jest.fn();
export const takeScreenshotForPage = jest.fn();
export const takeScreenshotForXPath = jest.fn();
export const findHTML = jest.fn();
export const findCSS = jest.fn();

export class DriverMock implements Driver {
  sources = new Map();
  launch = launch;
  quit = quit;
  open = open;
  close = close;

  addScript = addScript;
  runScript = runScript;
  waitFor = waitFor;
  waitForFunction = waitForFunction;
  takeScreenshotForPage = takeScreenshotForPage;
  takeScreenshotForXPath = takeScreenshotForXPath;

  findHTML = findHTML;
  findCSS = findCSS;
}
