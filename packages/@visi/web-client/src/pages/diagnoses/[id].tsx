import { Progress } from '@visi/web-ui';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { Project } from '../../components/project';
import { Report } from '../../components/report';
import { Status } from '../../generated/graphql';
import { useDiagnosis } from '../../hooks/use-diagnosis';
import { useTranslation } from '../../utils/i18next';
import { withApollo } from '../../utils/with-apollo';

const Layout = styled.main``;

const Content = styled.div`
  box-sizing: border-box;
  width: 1080px;
  margin: 24px auto;
  padding: 24px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
`;

const ReportList = styled.ul`
  margin: 0;
  padding: 0;
`;

const ReportListItem = styled.li`
  display: block;
  list-style-type: none;

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;

const Diagnoses: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  if (typeof router.query.id !== 'string') {
    throw new TypeError('Id must be a string');
  }

  const { data, loading, error } = useDiagnosis(router.query.id);

  if (loading) {
    return <p>{t('diagnoses.loading', 'Loading...')}</p>;
  }

  if (error || !data) {
    return <p>{t('diagnoses.error', 'Error occurred')}</p>;
  }

  const { diagnosis } = data;

  const title = t('diagnoses.title', 'Diagnostics Result: {{domain}}', {
    domain: new URL(diagnosis.url).hostname,
  });

  const description = t(
    'diagnoses.description',
    'You diagnostics result of Visible',
  );

  return (
    <Layout>
      <NextSeo title={title} description={description} openGraph={{ title }} />
      <Project diagnosis={diagnosis} />

      <Content>
        {diagnosis.status !== Status.Done && (
          <Progress max={diagnosis.totalCount} value={diagnosis.doneCount} />
        )}

        {diagnosis.sources.flatMap((source) => source.reports).length !== 0 ? (
          <ReportList>
            {diagnosis.sources.map((source) =>
              source.reports.map((report) => (
                <ReportListItem key={report.id}>
                  <Report report={report} original={source.content} />
                </ReportListItem>
              )),
            )}
          </ReportList>
        ) : diagnosis.status === Status.Done ? (
          <p>
            {t(
              'diagnoses.no-reports',
              'Awesome! No issue found for this website',
            )}
          </p>
        ) : null}
      </Content>
    </Layout>
  );
};

Diagnoses.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default withApollo(Diagnoses);
