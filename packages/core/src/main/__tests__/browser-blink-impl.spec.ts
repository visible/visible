import puppeteer from 'puppeteer';
import { BrowserBlinkImpl } from '../browser-blink-impl';

const newPage = jest.fn();

jest.mock('puppeteer');
(puppeteer.launch as jest.Mock).mockResolvedValue({ newPage });

describe('BrowserBlinkImpl', () => {
  let blink: BrowserBlinkImpl;

  beforeAll(() => {
    blink = new BrowserBlinkImpl();
  });

  it('maps settings to launch option', async () => {
    const settings = {
      language: 'en-US',
      width: 1080,
      height: 900,
      headless: false,
    };

    await blink.setup(settings);

    expect(puppeteer.launch).toBeCalledWith(
      expect.objectContaining({
        args: ['--disable-web-security', '--lang=en-US'],
        defaultViewport: {
          width: 1080,
          height: 900,
        },
        headless: false,
      }),
    );
    expect(newPage).toBeCalled();
  });
});
