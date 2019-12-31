import { t } from '../../__fixture__/i18n';
import { ColorContrastRule } from './color-contrast';

describe('color-contrast', () => {
  const colorContrast = new ColorContrastRule({ t });

  it('returns an error when color contrast does not satisfieis WCAG G18 AA', async () => {
    document.body.innerHTML = `
      <button style="background-color: white; color: white;">
        click me!
      </button>
    `;

    const [report] = await colorContrast.audit();

    expect(report).toEqual(
      expect.objectContaining({
        type: 'color-contrast.wcag-aa',
        rule: 'color-contrast',
        level: 'error',
      }),
    );
  });

  it('returns a warning when a color contrast does not satisfies WCAG G18 AAA', async () => {
    document.body.innerHTML = `
      <button style="background-color: #666; color: white;">
        click me!
      </button>
    `;

    const [report] = await colorContrast.audit();

    expect(report).toEqual(
      expect.objectContaining({
        type: 'color-contrast.wcag-aaa',
        rule: 'color-contrast',
        level: 'warn',
      }),
    );
  });

  it('returns nothing when accessible', async () => {
    document.body.innerHTML = `
      <button style="background-color: blue; color: white;">
        click me!
      </button>
    `;

    const [report] = await colorContrast.audit();

    expect(report).toEqual(
      expect.objectContaining({
        type: 'color-contrast.ok',
        rule: 'color-contrast',
        level: 'ok',
      }),
    );
  });
});
