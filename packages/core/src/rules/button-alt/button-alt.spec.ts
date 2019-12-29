import { t } from '../../__fixture__/i18n';
import { ReportLevel } from '../../domain/report';
import { ButtonAltRule } from './button-alt';

describe('button-alt', () => {
  const buttonAltRule = new ButtonAltRule({ page, t });

  it('counts button elements', async () => {
    await page.setContent(`<button></button>`);
    const count = await buttonAltRule.countAudits();
    expect(count).toBe(1);
  });

  it('repots when button does not have neither textContent nor title', async () => {
    await page.setContent(`<button></button>`);

    const [report] = await buttonAltRule.audit();

    expect(report).toEqual(
      expect.objectContaining({
        rule: 'button-alt',
        type: 'button-alt.no-alt',
        level: ReportLevel.ERROR,
      }),
    );
  });

  it('returns nothing when button is accessible', async () => {
    await page.setContent(`
      <button>
        This is a button
      </button>
    `);

    const [report] = await buttonAltRule.audit();

    expect(report).toEqual(
      expect.objectContaining({
        rule: 'button-alt',
        type: 'button-alt.ok',
        level: ReportLevel.OK,
      }),
    );
  });
});
