import React from 'react';
// import { useRouteMatch } from 'react-router';
import * as UI from '@visi/ui';
import { Diagnostic, ReportType } from '../../generated/graphql';
// import { useFetchDiagnosticSmallQuery } from '../../generated/graphql';

interface DiagnosticsProps {
  diagnostic: Diagnostic;
}

export const Diagnostics = (props: DiagnosticsProps) => {
  const { diagnostic } = props;

  // if (!data) {
  //   return <p>loading...</p>;
  // }

  return (
    <UI.Content>
      <h1>Diagnostic Result: {diagnostic.id}</h1>

      {diagnostic.reports
        .filter(report => report.type !== ReportType.Ok)
        .map(report => (
          <div key={report.id}>
            <h2>
              {report.id}@{report.content.xpath}
            </h2>
            <UI.Code language="html">{report.content.html}</UI.Code>
            <UI.Code language="css">{report.content.css}</UI.Code>
          </div>
        ))}
    </UI.Content>
  );
};
