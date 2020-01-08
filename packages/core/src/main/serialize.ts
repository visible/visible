export const serialize = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => {
  const serializedValues = values.map(value => JSON.stringify(value));

  return strings.reduce((expr, string, i) => {
    if (!serializedValues[i]) return expr;
    return `${string}JSON.parse("${serializedValues[i]}")${expr}`;
  }, '');
};
