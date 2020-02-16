import React from 'react';
import Helmet from 'react-helmet';
import { useRouteMatch } from 'react-router';
import * as UI from '@visi/ui';
import { useTranslation } from 'react-i18next';
import {
  ReportType,
  useFetchDiagnosisSmallQuery,
} from '../../generated/graphql';

export const Diagnoses = () => {
  const { t } = useTranslation();
  const match = useRouteMatch<{ id: string }>();

  const { data, loading, error } = useFetchDiagnosisSmallQuery({
    variables: {
      id: match.params.id,
    },
  });

  if (loading) {
    return <p>{t('diagnoses.loading', 'Loading...')}</p>;
  }

  if (error || !data) {
    return <p>{t('diagnoses.error', 'Error occurred')}</p>;
  }

  const { diagnosis } = data;

  return (
    <>
      <Helmet>
        <title>
          {t('diagnoses.title', 'Diagnostics Result: {{id}}', {
            id: diagnosis.id,
          })}
        </title>
      </Helmet>

      <UI.Content>
        <h1>
          {t('diagnoses.title', 'Diagnostics Result: {{id}}', {
            id: diagnosis.id,
          })}
        </h1>

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
    </>
  );
};
