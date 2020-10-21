const { colors, boxShadow } = require('tailwindcss/defaultTheme');

// https://github.com/vercel/next.js/blob/canary/examples/with-tailwindcss/tailwind.config.js
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/components/**/*.{ts,tsx}', './src/pages/**/*.{ts,tsx}'],
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
    'odd',
    'active',
  ],
};
