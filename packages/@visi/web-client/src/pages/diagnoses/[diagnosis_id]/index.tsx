import {
  faFile,
  faFlag,
  faUniversalAccess,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { DiagnosisProgress } from '../../../components/diagnosis-progress';
import { HelpImprove } from '../../../components/help-improve/help-improve';
import { KeywordList } from '../../../components/keyword-list/keyword-list';
import { Newsletter } from '../../../components/newsletter';
import { Project } from '../../../components/project';
import { ReportList } from '../../../components/report-list';
import { Rerun } from '../../../components/rerun';
import { SourceList } from '../../../components/source-list';
import {
  Divider,
  Layout,
  Nav,
  Typography,
  Widget,
} from '../../../components/ui';
import {
  FetchDiagnosisLargeDocument,
  Outcome,
  Status,
} from '../../../generated/graphql';
import { useDiagnosis } from '../../../hooks/use-diagnosis';
import { initializeApollo } from '../../../utils/apollo';
import { useTranslation } from '../../../utils/i18next';

const Diagnoses: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  if (typeof router.query.diagnosis_id !== 'string') {
    throw new TypeError('Id must be a string');
  }

  const { data, loading, error } = useDiagnosis(router.query.diagnosis_id);

  // prettier-ignore
  const keywords = useMemo(() => [
    ...new Set(
      data?.diagnosis.sources
        .flatMap((source) => source.reports)
        .filter((report) => report.outcome === Outcome.Fail)
        .flatMap((report) => report.rule.keywords),
    ).values(),
  ].filter((v): v is string => v != null), [data?.diagnosis]);

  if (loading) {
    return <p>{t('diagnoses.loading', 'Loading...')}</p>;
  }

  if (error != null || data == null) {
    return (
      <>
        <p>{t('diagnoses.error', 'Error occurred')}</p>
        <samp>{error?.message}</samp>
      </>
    );
  }

  const { diagnosis } = data;
  const domain = new URL(diagnosis.url).hostname;
  const isSettled =
    diagnosis.status !== Status.Done && diagnosis.status !== Status.Failed;

  const title = t('diagnoses.title', 'Reports: {{domain}}', {
    domain,
  });

  const description = t(
    'diagnoses.description',
    'Accessibility issues and suggestions for {{domain}} provided by Visible',
    { domain },
  );

  return (
    <Layout.Page className="space-y-4 mb-12">
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          images: diagnosis.screenshot
            ? [{ url: diagnosis.screenshot, alt: diagnosis.url }]
            : undefined,
          title,
          description,
        }}
      />

      <section
        aria-label={t(
          'diagnoses.header.description',
          'Summary for this website',
        )}
        className={classNames('border-b', 'border-gray-200', 'bg-gray-100')}
      >
        <Layout.Container>
          <Project diagnosis={diagnosis} />

          <div className="flex justify-between items-center w-full mt-4">
            <Nav
              aria-label={t('diagnoses.nav', 'Diagnosis Navigation')}
              items={[
                {
                  href: '/diagnoses/[diagnosis_id]',
                  as: `/diagnoses/${diagnosis.id}`,
                  icon: <FontAwesomeIcon icon={faFlag} />,
                  children: t('diagnoses.reports', 'Reports'),
                },
                {
                  href: '/diagnoses/[diagnosis_id]/files',
                  as: `/diagnoses/${diagnosis.id}/files`,
                  icon: <FontAwesomeIcon icon={faFile} />,
                  children: t('diagnoses.files', 'Files'),
                },
                {
                  href: '/diagnoses/[diagnosis_id]/rules',
                  as: `/diagnoses/${diagnosis.id}/rules`,
                  icon: <FontAwesomeIcon icon={faUniversalAccess} />,
                  children: t('diagnoses.rules', 'Rules'),
                },
              ]}
            />
          </div>
        </Layout.Container>
      </section>

      <Layout.Container>
        <Layout.Main size="two-column">
          <DiagnosisProgress diagnosis={diagnosis} />

          <ReportList
            sources={diagnosis.sources}
            diagnosisId={diagnosis.id}
            loading={diagnosis.sources.length === 0}
            aria-busy={diagnosis.status !== Status.Done}
          />
        </Layout.Main>

        <Layout.Aside>
          <Rerun
            url={diagnosis.url}
            className="w-full flex justify-center"
            disabled={isSettled}
          />

          <Widget id="sources">
            <Widget.Title>
              <Typography variant="h3" fontSize="xl">
                {t('diagnoses.sources', 'Files')}
              </Typography>
            </Widget.Title>

            <Widget.Body>
              <SourceList
                diagnosisId={diagnosis.id}
                sources={diagnosis.sources}
                loading={diagnosis.sources.length === 0}
                withFailCount
              />
            </Widget.Body>
          </Widget>

          <Widget id="keywords">
            <Widget.Title>
              <Typography variant="h3" fontSize="xl">
                {t('diagnoses.keywords', 'Related Keywords')}
              </Typography>
            </Widget.Title>

            <Widget.Body>
              <KeywordList
                wrap
                keywords={keywords}
                loading={keywords.length === 0}
              />
            </Widget.Body>
          </Widget>
        </Layout.Aside>
      </Layout.Container>

      <Layout.Container className="space-y-10 my-4">
        <Divider className="mt-0 mb-0" />
        <HelpImprove withImage />
        <Newsletter withImage />
      </Layout.Container>
    </Layout.Page>
  );
};

Diagnoses.getInitialProps = async (ctx) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: FetchDiagnosisLargeDocument,
    variables: {
      id: ctx.query.diagnosis_id,
    },
  });

  return {
    namespacesRequired: ['web-client'],
    initialApolloState: apolloClient.cache.extract(),
  };
};

export default Diagnoses;
