import { t } from '../../__fixture__/i18n';
import { imageAlt } from './image-alt';

describe('img-alt', () => {
  it('returns report when the img element did not have an alt', async () => {
    await page.setContent(`
      <div>
        <img src="https://example.com" alt="" />
      </div>
    `);
    const [report] = await imageAlt({ page, t });

    expect(report).toEqual(
      expect.objectContaining({
        id: 'image-alt',
        type: 'error',
      }),
    );
  });

  it('returns nothing when the img is accessible', async () => {
    await page.setContent(`
      <img src="https://example.com" alt="this is an image" />
    `);

    const [report] = await imageAlt({ page, t });

    expect(report).toEqual(
      expect.objectContaining({
        id: 'image-alt',
        type: 'ok',
      }),
    );
  });
});
