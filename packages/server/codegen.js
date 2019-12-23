module.exports = {
  overwrite: true,
  schema: [require.resolve('@visi/schema')],
  documents: null,
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        scalars: {
          Date: 'Date',
        },
        contextType: '../context#Context',
        resolverTypeWrapperSignature:
          "import('type-fest').PartialDeep<T> | Promise<import('type-fest').PartialDeep<T>>",
        useIndexSignature: true,
      },
    },
  },
};
