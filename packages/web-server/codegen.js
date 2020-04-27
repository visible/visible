const ctx = '../../adapters/serializers/types';

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
          RuleType: ctx + '#RuleTypeAPI',
          Rule: ctx + '#RuleAPI',
          Source: ctx + '#SourceAPI',
          Location: ctx + '#LocationAPI',
          HTMLPointer: ctx + '#HTMLPointerAPI',
          CSSPointer: ctx + '#CSSPointerAPI',
          Pointer: ctx + '#PointerAPI',
          Outcome: ctx + '#OutcomeAPI',
          Report: ctx + '#ReportAPI',
          Status: ctx + '#StatusAPI',
          Diagnosis: ctx + '#DiagnosisAPI',
        },
      },
    },
  },
};
