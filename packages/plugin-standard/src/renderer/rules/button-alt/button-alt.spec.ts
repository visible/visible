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
        "rule": [Function],
        "sources": Array [
          Object {
            "pointer": Object {
              "xpath": "/html/body/button",
            },
            "type": "html",
          },
        ],
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
        "rule": [Function],
        "sources": Array [
          Object {
            "pointer": Object {
              "xpath": "/html/body/button",
            },
            "type": "html",
          },
        ],
        "target": "/html/body/button",
      }
    `);
  });
});
