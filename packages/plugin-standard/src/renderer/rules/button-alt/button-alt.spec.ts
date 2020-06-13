import { ButtonAltRule } from './button-alt';

describe('button-alt', () => {
  const buttonAltRule = new ButtonAltRule();

  it('reports when button does not have neither textContent nor title', async () => {
    document.body.innerHTML = `<button></button>`;

    const [report] = await buttonAltRule.run();

    expect(report.outcome).toBe('fail');
    expect(report).toMatchInlineSnapshot(`
      Object {
        "message": "button element must have title attribute or text content",
        "outcome": "fail",
        "pointers": Array [
          Object {
            "type": "html",
            "xpath": "/html/body/button",
          },
        ],
        "rule": [Function],
        "target": "/html/body/button",
      }
    `);
  });

  it('returns nothing when button is accessible', async () => {
    document.body.innerHTML = `
      <button>
        This is a button
      </button>
    `;

    const [report] = await buttonAltRule.run();

    expect(report.outcome).toBe('passed');
    expect(report).toMatchInlineSnapshot(`
      Object {
        "outcome": "passed",
        "pointers": Array [
          Object {
            "type": "html",
            "xpath": "/html/body/button",
          },
        ],
        "rule": [Function],
        "target": "/html/body/button",
      }
    `);
  });
});
