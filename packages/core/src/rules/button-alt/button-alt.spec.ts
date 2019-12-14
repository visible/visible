import { buttonAlt } from "./button-alt";

describe("button-alt", () => {
  it("returns report when button element did not have neither title nor text", async () => {
    await page.setContent(`<button></button>`);
    const [report] = await buttonAlt({ page });

    expect(report).toEqual(
      expect.objectContaining({
        id: "button-id"
      })
    );
  });

  it("returns nothing when button is accessible", async () => {
    await page.setContent(`
      <button>
        This is a button
      </button>
    `);

    const [report] = await buttonAlt({ page });

    expect(report).toBeUndefined();
  });
});
