const path = require('path');
const ctx = '../../adapters/presenters';

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
          Diagnosis: path.join(ctx, './diagnosis-presenters#DiagnosisAPI'),
          Report: path.join(ctx, './report-presenter#ReportAPI'),
          ReportType: path.join(ctx, './report-presenter#ReportTypeAPI'),
          Website: path.join(ctx, './website-presenter#WebsiteAPI'),
        },
      },
    },
  },
};
