import { t } from '../../../__fixture__/i18n';
import { ButtonAltRule } from './button-alt';

describe('button-alt', () => {
  const buttonAltRule = new ButtonAltRule({ t });

  it('repots when button does not have neither textContent nor title', async () => {
    document.body.innerHTML = `<button></button>`;

    const [report] = await buttonAltRule.audit();

    expect(report).toEqual(
      expect.objectContaining({
        rule: 'button-alt',
        type: 'button-alt.no-alt',
        level: 'error',
      }),
    );
  });

  it('returns nothing when button is accessible', async () => {
    document.body.innerHTML = `
      <button>
        This is a button
      </button>
    `;

    const [report] = await buttonAltRule.audit();

    expect(report).toEqual(
      expect.objectContaining({
        rule: 'button-alt',
        type: 'button-alt.ok',
        level: 'ok',
      }),
    );
  });
});
