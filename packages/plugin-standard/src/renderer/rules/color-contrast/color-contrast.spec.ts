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
        "message": "Color contrast must be greater than 4.5",
        "outcome": "fail",
        "pointers": Array [
          Object {
            "propertyName": "color",
            "type": "css-property",
            "xpath": "/html/body/button",
          },
          Object {
            "propertyName": "background-color",
            "type": "css-property",
            "xpath": "/html/body/button",
          },
        ],
        "rule": [Function],
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
        "pointers": Array [
          Object {
            "propertyName": "color",
            "type": "css-property",
            "xpath": "/html/body/button",
          },
          Object {
            "propertyName": "background-color",
            "type": "css-property",
            "xpath": "/html/body/button",
          },
        ],
        "rule": [Function],
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
        "pointers": Array [
          Object {
            "propertyName": "color",
            "type": "css-property",
            "xpath": "/html/body/button",
          },
          Object {
            "propertyName": "background-color",
            "type": "css-property",
            "xpath": "/html/body/button",
          },
        ],
        "rule": [Function],
        "target": "/html/body/button",
      }
    `);
  });
});
