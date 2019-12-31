import { t } from '../../__fixture__/i18n';
import { ImgAltRule } from './image-alt';

describe('img-alt', () => {
  const imgAltRule = new ImgAltRule({ t });

  it('returns report when the img element did not have an alt', async () => {
    document.body.innerHTML = `
      <div>
        <img src="https://example.com" alt="" />
      </div>
    `;

    const [report] = await imgAltRule.audit();

    expect(report).toEqual(
      expect.objectContaining({
        rule: 'img-alt',
        type: 'img-alt.no-alt',
        level: 'error',
      }),
    );
  });

  it('returns nothing when the img is accessible', async () => {
    document.body.innerHTML = `
      <img src="https://example.com" alt="this is an image" />
    `;

    const [report] = await imgAltRule.audit();

    expect(report).toEqual(
      expect.objectContaining({
        rule: 'img-alt',
        type: 'img-alt.ok',
        level: 'ok',
      }),
    );
  });
});
