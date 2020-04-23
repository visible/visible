import { ColorContrastRule } from './color-contrast';

describe('color-contrast', () => {
  const colorContrast = new ColorContrastRule();

  it('returns an error when color contrast does not satisfies WCAG G18 AA', async () => {
    document.body.innerHTML = `
      <button style="background-color: white; color: white;">
        click me!
      </button>
    `;

    const [report] = await colorContrast.run();

    expect(report.outcome).toBe('fail');
    expect(report).toMatchInlineSnapshot(`
      Object {
        "message": "Color contrast ratio should be greater than 7",
        "outcome": "fail",
        "rule": [Function],
        "sources": Array [
          Object {
            "pointer": Object {
              "propertyName": "color",
              "xpath": "/html/body/button",
            },
            "type": "css-property",
          },
          Object {
            "pointer": Object {
              "propertyName": "background-color",
              "xpath": "/html/body/button",
            },
            "type": "css-property",
          },
        ],
        "target": "/html/body/button",
      }
    `);
  });

  it('returns a warning when a color contrast does not satisfies WCAG G18 AAA', async () => {
    document.body.innerHTML = `
      <button style="background-color: #666; color: white;">
        click me!
      </button>
    `;

    const [report] = await colorContrast.run();

    expect(report.outcome).toBe('fail');
    expect(report).toMatchInlineSnapshot(`
      Object {
        "message": "Color contrast ratio should be greater than 7",
        "outcome": "fail",
        "rule": [Function],
        "sources": Array [
          Object {
            "pointer": Object {
              "propertyName": "color",
              "xpath": "/html/body/button",
            },
            "type": "css-property",
          },
          Object {
            "pointer": Object {
              "propertyName": "background-color",
              "xpath": "/html/body/button",
            },
            "type": "css-property",
          },
        ],
        "target": "/html/body/button",
      }
    `);
  });

  it('returns nothing when accessible', async () => {
    document.body.innerHTML = `
      <button style="background-color: blue; color: white;">
        click me!
      </button>
    `;

    const [report] = await colorContrast.run();

    expect(report.outcome).toBe('passed');
    expect(report).toMatchInlineSnapshot(`
      Object {
        "outcome": "passed",
        "rule": [Function],
        "sources": Array [
          Object {
            "pointer": Object {
              "propertyName": "color",
              "xpath": "/html/body/button",
            },
            "type": "css-property",
          },
          Object {
            "pointer": Object {
              "propertyName": "background-color",
              "xpath": "/html/body/button",
            },
            "type": "css-property",
          },
        ],
        "target": "/html/body/button",
      }
    `);
  });
});
