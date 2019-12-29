import { t } from '../../__fixture__/i18n';
import { ReportLevel } from '../../domain/report';
import { ColorContrastRule } from './color-contrast';

describe('color-contrast', () => {
  const colorContrast = new ColorContrastRule({ page, t });

  it('counts elements', async () => {
    await page.setContent(`<button></button>`);
    const count = await colorContrast.countAudits();
    expect(count).toBe(4); // 1 + html, body, head
  });

  it('returns an error when color contrast does not satisfieis WCAG G18 AA', async () => {
    await page.setContent(`
      <button style="background-color: white; color: white;">
        click me!
      </button>
    `);

    const [report] = await colorContrast.audit();

    expect(report).toEqual(
      expect.objectContaining({
        type: 'color-contrast.wcag-aa',
        rule: 'color-contrast',
        level: ReportLevel.ERROR,
      }),
    );
  });

  it('returns a warning when a color contrast does not satisfies WCAG G18 AAA', async () => {
    await page.setContent(`
      <button style="background-color: #666; color: white;">
        click me!
      </button>
    `);

    const [report] = await colorContrast.audit();

    expect(report).toEqual(
      expect.objectContaining({
        type: 'color-contrast.wcag-aaa',
        rule: 'color-contrast',
        level: ReportLevel.WARN,
      }),
    );
  });

  it('returns nothing when accessible', async () => {
    await page.setContent(`
      <button style="background-color: blue; color: white;">
        click me!
      </button>
    `);

    const [report] = await colorContrast.audit();

    expect(report).toEqual(
      expect.objectContaining({
        type: 'color-contrast.ok',
        rule: 'color-contrast',
        level: ReportLevel.OK,
      }),
    );
  });
});
