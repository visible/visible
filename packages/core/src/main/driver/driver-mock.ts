import { Driver } from './driver';

export const getTitle = jest.fn();
export const getURL = jest.fn();
export const addScriptTag = jest.fn();
export const exposeFunction = jest.fn();
export const run = jest.fn();
export const openURL = jest.fn();
export const waitFor = jest.fn();
export const waitForFunction = jest.fn();
export const cleanup = jest.fn();
export const takeScreenshotForPage = jest.fn();
export const takeScreenshotForXpath = jest.fn();

export class DriverMock implements Driver {
  getTitle = getTitle;
  getURL = getURL;
  exposeFunction = exposeFunction;
  addScriptTag = addScriptTag;
  run = run;
  openURL = openURL;
  waitFor = waitFor;
  waitForFunction = waitForFunction;
  cleanup = cleanup;
  takeScreenshotForPage = takeScreenshotForPage;
  takeScreenshotForXpath = takeScreenshotForXpath;
}
