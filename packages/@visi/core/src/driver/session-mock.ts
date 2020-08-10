import { Session } from './session';

export const getTitle = jest.fn();
export const getURL = jest.fn();
export const goto = jest.fn();
export const close = jest.fn();
export const addScript = jest.fn();
export const runScript = jest.fn();
export const waitFor = jest.fn();
export const waitForFunction = jest.fn();
export const takeScreenshotForPage = jest.fn();
export const takeScreenshotForXPath = jest.fn();
export const findHTML = jest.fn();
export const findCSS = jest.fn();

export class SessionMock implements Session {
  sources = new Map();
  getTitle = getTitle;
  getURL = getURL;
  goto = goto;
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
