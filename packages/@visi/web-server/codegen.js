const path = require('path');
const ctx = '../../../interfaces/presenters/types';

module.exports = {
  overwrite: true,
  schema: path.join(require.resolve('@visi/web-schema'), '..', '**/*.graphql'),
  generates: {
    './src/frameworks/server/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
    './src/frameworks/server/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        { add: "import { PartialDeep } from 'type-fest';" },
      ],
      config: {
        contextType: '../context#Context',
        defaultMapper: 'PartialDeep<{T}>',
        useIndexSignature: true,
        immutableTypes: true,
        scalars: {
          Date: 'Date',
        },
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
