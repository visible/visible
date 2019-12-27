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
          Account: '../../enterprise/entities#AccountAPI',
          Actor: '../../enterprise/entities#ActorAPI',
          Credential: '../../enterprise/entities#CredentialAPI',
          Diagnostic: '../../enterprise/entities#DiagnosisAPI',
          Organization: '../../enterprise/entities#OrganizationAPI',
          Report: '../../enterprise/entities#ReportAPI',
          ReportType: '../../enterprise/entities#ReportTypeAPI',
          Score: '../../enterprise/entities#ScoreAPI',
          Website: '../../enterprise/entities#WebsiteAPI',
        },
      },
    },
  },
};
