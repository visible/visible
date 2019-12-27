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
          Diagnostic: '../../domain/entities#DiagnosisAPI',
          Score: '../../domain/entities#ScoreAPI',
          Website: '../../domain/entities#WebsiteAPI',
          Report: '../../domain/entities#ReportAPI',
          Content: '../../domain/entities#ContentAPI',
          ReportType: '../../domain/entities#ReportTypeAPI',
          Credential: '../../domain/entities#CredentialAPI',
          Organization: '../../domain/entities#OrganizationAPI',
          Account: '../../domain/entities#AccountAPI',
          Actor: '../../domain/entities#ActorAPI',
        },
      },
    },
  },
};
