import { CDPSession } from 'puppeteer';

export const send = jest.fn();
export const on = jest.fn();

export const client = ({
  send,
  on,
} as unknown) as CDPSession;
