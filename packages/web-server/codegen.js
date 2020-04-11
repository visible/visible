const path = require('path');
const ctx = '../../adapters/serializers';

module.exports = {
  overwrite: true,
  schema: [require.resolve('@visi/web-schema')],
  documents: null,
  generates: {
    './src/frameworks/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        scalars: {
          Date: 'Date',
        },
        contextType: '../context#Context',
        resolverTypeWrapperSignature:
          "import('type-fest').PartialDeep<T> | Promise<import('type-fest').PartialDeep<T>>",
        useIndexSignature: true,
        mappers: {
          Diagnosis: path.join(ctx, './diagnosis-serializer#DiagnosisAPI'),
          Report: path.join(ctx, './report-serializer#ReportAPI'),
          ReportType: path.join(ctx, './report-serializer#ReportTypeAPI'),
          Website: path.join(ctx, './website-serializer#WebsiteAPI'),
        },
      },
    },
  },
};
