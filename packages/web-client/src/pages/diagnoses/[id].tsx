import { Content, Typography } from '@visi/web-ui';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { useFetchDiagnosisSmallQuery } from '../../generated/graphql';
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
    <Content>
      <NextSeo title={title} description={description} openGraph={{ title }} />
      <Typography variant="h1">{title}</Typography>

      {diagnosis.reports.map(report => (
        <div key={report.id}>
          <Typography variant="h2">{report.id}</Typography>
        </div>
      ))}
    </Content>
  );
};

Diagnoses.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default withApollo(Diagnoses);
