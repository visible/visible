module.exports = {
  rules: [
    {
      id: 'plugin-test',
      type: 'atomic',
      description: 'yay',
      create: async (ctx) => {
        const path = '/html/body/img';
        const node = ctx.driver.findHtmlNode(path);

        await ctx.report({
          sourceId: 'html',
          ruleId: this.id,
          outcome: 'fail',
          target: path,
          node,
          fix() {
            node.attribs.alt = 'this alt is added by Visible';
          },
        });
      },
    },

    {
      id: 'plugin-test-2',
      type: 'atomic',
      description: 'yay',
      create: async (ctx) => {
        const path = '/html/body/button';
        const [id, decl] = await ctx.driver.findCSSNode(path, 'background-color');

        await ctx.report({
          sourceId: id,
          ruleId: this.id,
          outcome: 'fail',
          target: path,
          node,
          fix() {
            decl.value = 'black';
          }
        });
      },
    },
  ],
};
