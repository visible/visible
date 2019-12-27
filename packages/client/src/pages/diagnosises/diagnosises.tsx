import React from 'react';
import { useRouteMatch } from 'react-router';
import * as UI from '@visi/ui';
import {
  ReportType,
  useFetchDiagnosisSmallQuery,
} from '../../generated/graphql';

export const Diagnosises = () => {
  const match = useRouteMatch<{ id: string }>();

  const { data, loading, error } = useFetchDiagnosisSmallQuery({
    variables: {
      id: match.params.id,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Error occurred...</p>;
  }

  const { diagnosis } = data;

  return (
    <UI.Content>
      <h1>Diagnostics Result: {diagnosis.id}</h1>

      {diagnosis.reports
        .filter(report => report.type !== ReportType.Ok)
        .map(report => (
          <div key={report.id}>
            <h2>{report.type}</h2>
            <span>@{report.xpath}</span>
            <p>{report.message}</p>
            <UI.Code language="html">{report.html || ''}</UI.Code>
            <UI.Code language="css">{report.css || ''}</UI.Code>
          </div>
        ))}
    </UI.Content>
  );
};
