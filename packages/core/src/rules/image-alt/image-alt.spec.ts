import { t } from '../../__fixture__/i18n';
import { ReportLevel } from '../../domain/report';
import { ImgAltRule } from './image-alt';

describe('img-alt', () => {
  const imgAltRule = new ImgAltRule({ page, t });

  it('counts img elements', async () => {
    await page.setContent(`<img src="https://example.com" alt="" />`);
    const count = await imgAltRule.countAudits();
    expect(count).toBe(1);
  });

  it('returns report when the img element did not have an alt', async () => {
    await page.setContent(`
      <div>
        <img src="https://example.com" alt="" />
      </div>
    `);

    const [report] = await imgAltRule.audit();

    expect(report).toEqual(
      expect.objectContaining({
        rule: 'img-alt',
        type: 'img-alt.no-alt',
        level: ReportLevel.ERROR,
      }),
    );
  });

  it('returns nothing when the img is accessible', async () => {
    await page.setContent(`
      <img src="https://example.com" alt="this is an image" />
    `);

    const [report] = await imgAltRule.audit();

    expect(report).toEqual(
      expect.objectContaining({
        rule: 'img-alt',
        type: 'img-alt.ok',
        level: ReportLevel.OK,
      }),
    );
  });
});
