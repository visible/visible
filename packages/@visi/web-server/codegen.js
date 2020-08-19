module.exports = {
  overwrite: true,
  schema: require.resolve('@visi/web-schema'),
  generates: {
    './src/frameworks/server/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        { add: { content: "import { PartialDeep } from 'type-fest';" } },
      ],
      config: {
        contextType: '../context#Context',
        defaultMapper: 'PartialDeep<{T}>',
        useIndexSignature: true,
        immutableTypes: true,
        scalars: {
          Date: 'Date',
          URL: 'String',
        },
        // mappers: {
        //   RuleType: ctx + '#RuleTypeAPI',
        //   Rule: ctx + '#RuleAPI',
        //   Source: ctx + '#SourceAPI',
        //   Location: ctx + '#LocationAPI',
        //   HTMLPointer: ctx + '#HTMLPointerAPI',
        //   CSSPointer: ctx + '#CSSPointerAPI',
        //   Pointer: ctx + '#PointerAPI',
        //   Outcome: ctx + '#OutcomeAPI',
        //   Report: ctx + '#ReportAPI',
        //   Status: ctx + '#StatusAPI',
        //   Diagnosis: ctx + '#DiagnosisAPI',
        // },
      },
    },
  },
};
