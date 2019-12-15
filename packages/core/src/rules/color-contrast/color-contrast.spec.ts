import { colorContrast } from './color-contrast';

describe('color-contrast', () => {
  it('returns an error when color contrast does not satisfieis WCAG G18 AA', async () => {
    await page.setContent(`
      <button style="background-color: white; color: white;">
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

  it('returns a warning when a color contrast does not satisfies WCAG G18 AAA', async () => {
    await page.setContent(`
      <button style="background-color: #666; color: white;">
        click me!
      </button>
    `);

    const [report] = await colorContrast({ page });

    expect(report).toEqual(
      expect.objectContaining({
        id: 'color-contrast',
        type: 'warn',
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

    expect(report).toEqual(
      expect.objectContaining({
        id: 'color-contrast',
        type: 'ok',
      }),
    );
  });
});
