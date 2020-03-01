import * as UI from '@visi/web-ui';
import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';

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

  const title = t('diagnoses.title', 'Diagnostics Result: {{id}}', {
    id: diagnosis.id,
  });
  const description = t(
    'diagnoses.description',
    'You diagnostics result of Visible',
  );

  return (
    <UI.Content>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>

      <h1>{title}</h1>

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