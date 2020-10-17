module.exports = {
  overwrite: true,
  schema: require.resolve('@visi/web-schema'),
  documents: './src/**/*.graphql',
  generates: {
    './src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'typescript-resolvers',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        useIndexSignature: true,
      },
    },
    './src/generated/introspection-result.ts': {
      plugins: ['fragment-matcher'],
      config: {
        apolloClientVersion: 3,
      },
    },
  },
};
