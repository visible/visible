const { colors, boxShadow } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    colors: {
      ...colors,
      primary: colors.orange,
    },
    boxShadow: (theme) => ({
      ...boxShadow,
      outline: `0 0 0 3px ${theme('colors.orange.300')}`,
    }),
  },
  // https://tailwindcss.com/docs/configuring-variants#enabling-variants-globally
  variants: [
    'responsive',
    'group-hover',
    'disabled',
    'hover',
    'focus',
    'first',
    'last',
    'active',
  ],
};
