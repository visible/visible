export const serialize = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => {
  const serializedValues = values.map(value => JSON.stringify(value));

  return strings.reduce((expr, string, i) => {
    if (i === 0) return string;
    return `${expr}JSON.parse('${serializedValues[i - 1]}')${string}`;
  }, '');
};
