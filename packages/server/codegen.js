const path = require('path');
const context = '../../adapters/serializers';

module.exports = {
  overwrite: true,
  schema: [require.resolve('@visi/schema')],
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
          Diagnosis: path.join(context, './diagnosis-serializer#DiagnosisAPI'),
          Report: path.join(context, './report-serializer#ReportAPI'),
          ReportType: path.join(context, './report-serializer#ReportTypeAPI'),
          Website: path.join(context, './website-serializer#WebsiteAPI'),
        },
      },
    },
  },
};
