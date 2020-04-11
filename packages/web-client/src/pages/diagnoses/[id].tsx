import * as UI from '@visi/web-ui';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import {
  ReportType,
  useFetchDiagnosisSmallQuery,
} from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { withApollo } from '../../utils/with-apollo';

const Diagnoses: NextPage = () => {
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
      <NextSeo title={title} description={description} openGraph={{ title }} />

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

Diagnoses.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default withApollo(Diagnoses);
