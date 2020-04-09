import * as UI from '@visi/web-ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  ReportType,
  useFetchDiagnosisSmallQuery,
} from '../../generated/graphql';
import { withApollo } from '../../utils/with-apollo';

const Diagnoses = () => {
  const { t } = useTranslation();
  const router = useRouter();

  if (typeof router.query.id !== 'string') {
    throw new Error('Id must be a string');
  }

  const { data, loading, error } = useFetchDiagnosisSmallQuery({
    variables: {
      id: router.query.id,
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
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <h1>{title}</h1>

      {diagnosis.reports
        .filter(report => report.type !== ReportType.Ok)
        .map(report => (
          <div key={report.id}>
            <h2>{report.type}</h2>
            <span>@{report.xpath}</span>
            <p>{report.message}</p>
            <UI.Code language="html">{report.html ?? ''}</UI.Code>
            <UI.Code language="css">{report.css ?? ''}</UI.Code>
          </div>
        ))}
    </UI.Content>
  );
};

export default withApollo(Diagnoses);
