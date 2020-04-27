import { ImgAltRule } from './image-alt';

describe('img-alt', () => {
  const imgAltRule = new ImgAltRule();

  it('returns report when the img element did not have an alt', async () => {
    document.body.innerHTML = `
      <div>
        <img src="https://example.com" alt="" />
      </div>
    `;

    const [report] = await imgAltRule.run();

    expect(report.outcome).toBe('fail');
    expect(report).toMatchInlineSnapshot(`
      Object {
        "message": "img element must have alt attribute",
        "outcome": "fail",
        "pointers": Array [
          Object {
            "type": "html",
            "xpath": "/html/body/div/img",
          },
        ],
        "rule": [Function],
        "target": "/html/body/div/img",
      }
    `);
  });

  it('returns nothing when the img is accessible', async () => {
    document.body.innerHTML = `
      <img src="https://example.com" alt="this is an image" />
    `;

    const [report] = await imgAltRule.run();

    expect(report.outcome).toBe('passed');
    expect(report).toMatchInlineSnapshot(`
      Object {
        "outcome": "passed",
        "pointers": Array [
          Object {
            "type": "html",
            "xpath": "/html/body/img",
          },
        ],
        "rule": [Function],
        "target": "/html/body/img",
      }
    `);
  });
});
