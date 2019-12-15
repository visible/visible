import { colorContrast } from './color-contrast';

describe('color-contrast', () => {
  it('returns a report when color contrast ratio is lesser than or equal to 4.5:1', async () => {
    await page.setContent(`
      <button style="background-color: cyan; color: white;">
        click me!
      </button>
    `);

    const [report] = await colorContrast({ page });

    expect(report).toEqual(
      expect.objectContaining({
        id: 'color-contrast',
        type: 'error',
      }),
    );
  });

  it('returns nothing when accessible', async () => {
    await page.setContent(`
      <button style="background-color: blue; color: white;">
        click me!
      </button>
    `);

    const [report] = await colorContrast({ page });

    expect(report).toBeUndefined();
  });
});
